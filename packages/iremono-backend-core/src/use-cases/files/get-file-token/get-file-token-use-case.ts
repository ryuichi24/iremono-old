import { StorageItemRepository } from '../../../repositories';
import { TokenService } from '../../../services';
import { UseCase } from '../../../shared/use-case-lib';
import { InvalidRequestError, NotExistError } from '../../../shared/utils/errors';
import { GetFileTokenRequestDTO } from './get-file-token-request-DTO';
import { GetFileTokenResponseDTO } from './get-file-token-response-DTO';

export class GetFileTokenUseCase implements UseCase<GetFileTokenRequestDTO, GetFileTokenResponseDTO> {
  private readonly _storageItemRepository: StorageItemRepository;
  private readonly _tokenService: TokenService;

  constructor(storageItemRepository: StorageItemRepository, tokenService: TokenService) {
    this._storageItemRepository = storageItemRepository;
    this._tokenService = tokenService;
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
      fileToken = this._tokenService.generateDownloadFileToken({
        fileId: fileToDownload.id,
        clientEncryptionKey: dto.clientEncryptionKey,
      });

    if (dto.tokenType === 'stream')
      fileToken = this._tokenService.generateStreamFileToken({
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
