import { StorageItem } from '../../../entities';
import { makeStorageItemDTO } from '../../../models';
import { StorageItemRepository } from '../../../repositories';
import { UseCase } from '../../../shared/use-case-lib';
import { InvalidRequestError } from '../../../shared/utils/errors';
import { UploadFileRequestDTO } from './upload-file-request-DTO';
import { UploadFileResponseDTO } from './upload-file-response-DTO';

export class UploadFileUseCase implements UseCase<UploadFileRequestDTO, UploadFileResponseDTO> {
  private readonly _storageItemRepository: StorageItemRepository;

  constructor(storageItemRepository: StorageItemRepository) {
    this._storageItemRepository = storageItemRepository;
  }

  public async handle(dto: UploadFileRequestDTO): Promise<UploadFileResponseDTO> {
    const parentFolder = await this._storageItemRepository.findOneById(dto.parentId, dto.ownerId);

    if (!parentFolder || !parentFolder.isFolder) throw new InvalidRequestError('the parent folder does not exist.');

    if (parentFolder.isInTrash) throw new InvalidRequestError('the parent folder is in a trash.');

    const file = new StorageItem({
      name: dto.name,
      isFolder: false,
      ownerId: dto.ownerId,
      parentId: dto.parentId,
      filePath: dto.filePath,
      fileSize: dto.fileSize,
      mimeType: dto.mimeType,
      initializationVector: dto.fileInitializationVector,
      thumbnailPath: dto.thumbnailPath,
      thumbnailSize: dto.thumbnailSize,
      thumbnailInitializationVector: dto.thumbnailInitializationVector,
      isEncryptedWithClientKey: dto.isEncryptedWithClientKey,
    });

    const saved = await this._storageItemRepository.save(file);

    return makeStorageItemDTO(saved);
  }
}
