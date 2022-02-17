import { StorageItemRepository, UserRepository } from '../../../repositories';
import { UseCase } from '../../../shared/use-case-lib';
import { DownloadFileThumbnailRequestDTO } from './download-file-thumbnail-request-DTO';
import { DownloadFileThumbnailResponseDTO } from './download-file-thumbnail-response-DTO';

export class DownloadFileThumbnailUseCase
  implements UseCase<DownloadFileThumbnailRequestDTO, DownloadFileThumbnailResponseDTO>
{
  private readonly _storageItemRepository: StorageItemRepository;
  private readonly _userRepository: UserRepository;

  constructor(storageItemRepository: StorageItemRepository, userRepository: UserRepository) {
    this._storageItemRepository = storageItemRepository;
    this._userRepository = userRepository;
  }

  public async handle(dto: DownloadFileThumbnailRequestDTO): Promise<DownloadFileThumbnailResponseDTO> {
    const fileOfThumbnailToDownload = await this._storageItemRepository.findOneById(dto.id, dto.ownerId);

    if (!fileOfThumbnailToDownload) {
      throw new Error('the file does not exist.');
    }

    if (fileOfThumbnailToDownload.isInTrash) {
      throw new Error('the file is in a trash.');
    }

    const responseDto: DownloadFileThumbnailResponseDTO = {
      name: `thumbnail.png`,
      thumbnailPath: fileOfThumbnailToDownload.thumbnailPath!,
      thumbnailSize: fileOfThumbnailToDownload.thumbnailSize!,
      thumbnailInitializationVector: fileOfThumbnailToDownload.thumbnailInitializationVector!,
    };

    if (fileOfThumbnailToDownload.isEncryptedWithClientKey) {
      const user = await this._userRepository.findOneById(dto.ownerId);
      if (!user) throw new Error('the user is not found');

      responseDto.clientEncryptionKeyInitializationVector = user.encryptionKeyInitializationVector!;
    }

    return responseDto;
  }
}
