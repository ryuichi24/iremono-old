import { StorageItemRepository } from '../../../repositories';
import { IDownloadFileTokenService } from '../../../services';
import { InvalidRequestError, NotExistError } from '../../../shared/utils/errors';
import { DownloadFileRequestDTO, DownloadFileResponseDTO, IDownloadFileUseCase } from './contracts';

export class DownloadFileUseCase implements IDownloadFileUseCase {
  constructor(
    private readonly _storageItemRepository: StorageItemRepository,
    private readonly _downloadFileTokenService: IDownloadFileTokenService,
  ) {}

  public async handle(dto: DownloadFileRequestDTO): Promise<DownloadFileResponseDTO> {
    const payloadFromToken = this._downloadFileTokenService.verify(dto.downloadFileToken);

    console.log(payloadFromToken);

    if (payloadFromToken?.fileId !== dto.id) throw new InvalidRequestError('the download file token is invalid.');

    const fileToDownload = await this._storageItemRepository.findOneById(payloadFromToken.fileId);

    if (!fileToDownload) {
      throw new NotExistError('the file does not exist.');
    }

    if (fileToDownload.isInTrash) {
      throw new InvalidRequestError('the file is in a trash.');
    }

    this._downloadFileTokenService.revoke(dto.downloadFileToken);

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
