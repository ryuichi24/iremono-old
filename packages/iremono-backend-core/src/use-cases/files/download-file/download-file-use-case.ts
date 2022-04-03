import { StorageItemRepository } from '../../../repositories';
import { TokenService } from '../../../services';
import { InvalidRequestError, NotExistError } from '../../../shared/utils/errors';
import { DownloadFileRequestDTO, DownloadFileResponseDTO, IDownloadFileUseCase } from './contracts';

export class DownloadFileUseCase implements IDownloadFileUseCase {
  private readonly _storageItemRepository: StorageItemRepository;
  private readonly _tokenService: TokenService;

  constructor(storageItemRepository: StorageItemRepository, tokenService: TokenService) {
    this._storageItemRepository = storageItemRepository;
    this._tokenService = tokenService;
  }

  public async handle(dto: DownloadFileRequestDTO): Promise<DownloadFileResponseDTO> {
    const payloadFromToken = this._tokenService.verifyDownloadFileToken(dto.downloadFileToken);

    if (payloadFromToken?.fileId !== dto.id) throw new InvalidRequestError('the download file token is invalid.');

    const fileToDownload = await this._storageItemRepository.findOneById(payloadFromToken.fileId);

    if (!fileToDownload) {
      throw new NotExistError('the file does not exist.');
    }

    if (fileToDownload.isInTrash) {
      throw new InvalidRequestError('the file is in a trash.');
    }

    this._tokenService.revokeDownloadFileToken(dto.downloadFileToken);

    const responseDto: DownloadFileResponseDTO = {
      name: fileToDownload.name,
      mimeType: fileToDownload.mimeType!,
      filePath: fileToDownload.filePath!,
      fileSize: fileToDownload.fileSize!,
      fileInitializationVector: fileToDownload.initializationVector!,
      clientEncryptionKey: payloadFromToken.clientEncryptionKey,
    };

    return responseDto;
  }
}
