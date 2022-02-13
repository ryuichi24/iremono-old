import { makeStorageItemDTO } from '../../../models';
import { StorageItemRepository } from '../../../repositories';
import { UseCase } from '../../../shared/use-case-lib';
import { DownloadFileThumbnailRequestDTO } from './download-file-thumbnail-request-DTO';
import { DownloadFileThumbnailResponseDTO } from './download-file-thumbnail-response-DTO';

export class DownloadFileThumbnailUseCase
  implements UseCase<DownloadFileThumbnailRequestDTO, DownloadFileThumbnailResponseDTO>
{
  private readonly _storageItemRepository: StorageItemRepository;

  constructor(storageItemRepository: StorageItemRepository) {
    this._storageItemRepository = storageItemRepository;
  }

  public async handle(dto: DownloadFileThumbnailRequestDTO): Promise<DownloadFileThumbnailResponseDTO> {
    const fileOfThumbnailToDownload = await this._storageItemRepository.findOneById(dto.id, dto.ownerId);

    if (!fileOfThumbnailToDownload) {
      throw new Error('the file does not exist.');
    }

    if (fileOfThumbnailToDownload.isInTrash) {
      throw new Error('the file is in a trash.');
    }

    return {
      name: `thumbnail.png`,
      thumbnailPath: fileOfThumbnailToDownload.thumbnailPath!,
      thumbnailSize: fileOfThumbnailToDownload.thumbnailSize!,
      thumbnailInitializationVector: fileOfThumbnailToDownload.thumbnailInitializationVector!,
    };
  }
}
