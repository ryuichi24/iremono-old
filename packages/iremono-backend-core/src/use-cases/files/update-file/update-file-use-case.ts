import { makeStorageItemDTO } from '../../../models';
import { StorageItemRepository } from '../../../repositories';
import { UseCase } from '../../../shared/use-case-lib';
import { UpdateFileRequestDTO } from './update-file-request-DTO';
import { UpdateFileResponseDTO } from './update-file-response-DTO';

export class UpdateFileUseCase implements UseCase<UpdateFileRequestDTO, UpdateFileResponseDTO> {
  private readonly _storageItemRepository: StorageItemRepository;

  constructor(storageItemRepository: StorageItemRepository) {
    this._storageItemRepository = storageItemRepository;
  }

  public async handle(dto: UpdateFileRequestDTO): Promise<UpdateFileResponseDTO> {
    const fileToUpdate = await this._storageItemRepository.findOneById(dto.id, dto.ownerId);

    if (!fileToUpdate || fileToUpdate.isFolder) throw new Error('the file does not exist.');

    if (fileToUpdate.isInTrash) throw new Error('the file is in a trash.');

    if (dto.name) fileToUpdate.rename(dto.name);

    if (dto.parentId) {
      const parentExists = !!(await this._storageItemRepository.findOneById(dto.parentId, dto.ownerId));
      if (!parentExists) throw new Error('the parent folder does not exist.');
      fileToUpdate.move(dto.parentId);
    }

    const saved = await this._storageItemRepository.save(fileToUpdate);

    return makeStorageItemDTO(saved);
  }
}
