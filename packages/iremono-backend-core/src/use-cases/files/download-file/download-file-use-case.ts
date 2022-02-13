import { makeStorageItemDTO } from '../../../models';
import { StorageItemRepository } from '../../../repositories';
import { UseCase } from '../../../shared/use-case-lib';
import { DownloadFileRequestDTO } from './download-file-request-DTO';
import { DownloadFileResponseDTO } from './download-file-response-DTO';

export class DownloadFileUseCase implements UseCase<DownloadFileRequestDTO, DownloadFileResponseDTO> {
  private readonly _storageItemRepository: StorageItemRepository;

  constructor(storageItemRepository: StorageItemRepository) {
    this._storageItemRepository = storageItemRepository;
  }

  public async handle(dto: DownloadFileRequestDTO): Promise<DownloadFileResponseDTO> {
    const fileToDownload = await this._storageItemRepository.findOneById(dto.id, dto.ownerId);

    if (!fileToDownload) {
      throw new Error('the file does not exist.');
    }

    return {
      name: fileToDownload.name,
      mimeType: fileToDownload.mimeType!,
      filePath: fileToDownload.filePath!,
      fileSize: fileToDownload.fileSize!,
      fileInitializationVector: fileToDownload.initializationVector!,
    };
  }
}
