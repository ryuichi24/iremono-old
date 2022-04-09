import { StorageItemRepository } from '../../../repositories';
import { IDownloadFileTokenService, IStreamFileTokenService } from '../../../services';
import { InvalidRequestError, NotExistError } from '../../../shared/utils/errors';
import { GetFileTokenRequestDTO, GetFileTokenResponseDTO, IGetFileTokenUseCase } from './contracts';

export class GetFileTokenUseCase implements IGetFileTokenUseCase {
  private readonly _storageItemRepository: StorageItemRepository;

  constructor(
    storageItemRepository: StorageItemRepository,
    private readonly _downloadFileTokenService: IDownloadFileTokenService,
    private readonly _streamFileTokenService: IStreamFileTokenService,
  ) {
    this._storageItemRepository = storageItemRepository;
  }

  public async handle(dto: GetFileTokenRequestDTO): Promise<GetFileTokenResponseDTO> {
    const fileToDownload = await this._storageItemRepository.findOneById(dto.id);

    if (!fileToDownload) {
      throw new NotExistError('the file does not exist.');
    }

    if (fileToDownload.isInTrash) {
      throw new InvalidRequestError('the file is in a trash.');
    }

    if (fileToDownload.ownerId !== dto.ownerId) {
      throw new InvalidRequestError(`the owner does not match the file's owner`);
    }

    if (fileToDownload.isCryptoFolderItem && !dto.clientEncryptionKey) {
      throw new InvalidRequestError(`client encryption is not provided`);
    }

    let fileToken;

    if (dto.tokenType === 'download')
      fileToken = this._downloadFileTokenService.generate({
        fileId: fileToDownload.id,
        clientEncryptionKey: dto.clientEncryptionKey,
      });

    if (dto.tokenType === 'stream')
      fileToken = this._streamFileTokenService.generate({
        fileId: fileToDownload.id,
        clientEncryptionKey: dto.clientEncryptionKey,
      });

    if (!fileToken) throw new InvalidRequestError(`the requested token type is invalid`);

    return {
      fileToken,
      tokenType: dto.tokenType,
    };
  }
}
