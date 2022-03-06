import { StorageItemRepository, UserRepository } from '../../../repositories';
import { UseCase } from '../../../shared/use-case-lib';
import { NotExistError } from '../../../shared/utils/errors';
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
    const fileOfThumbnailToDownload = await this._storageItemRepository.findOneById(dto.id);

    if (!fileOfThumbnailToDownload) {
      throw new NotExistError('the file does not exist.');
    }

    const responseDto: DownloadFileThumbnailResponseDTO = {
      name: `thumbnail.png`,
      thumbnailPath: fileOfThumbnailToDownload.thumbnailPath!,
      thumbnailSize: fileOfThumbnailToDownload.thumbnailSize!,
      thumbnailInitializationVector: fileOfThumbnailToDownload.thumbnailInitializationVector!,
      clientEncryptionKey: dto.clientEncryptionKey,
    };

    return responseDto;
  }
}
