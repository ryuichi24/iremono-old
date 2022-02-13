import { makeStorageItemDTO } from '../../../models';
import { StorageItemRepository } from '../../../repositories';
import { UseCase } from '../../../shared/use-case-lib';
import { UpdateFolderRequestDTO } from './update-folder-request-DTO';
import { UpdateFolderResponseDTO } from './update-folder-response-DTO';

export class UpdateFolderUseCase implements UseCase<UpdateFolderRequestDTO, UpdateFolderResponseDTO> {
  private readonly _storageItemRepository: StorageItemRepository;

  constructor(storageItemRepository: StorageItemRepository) {
    this._storageItemRepository = storageItemRepository;
  }

  public async handle(dto: UpdateFolderRequestDTO): Promise<UpdateFolderResponseDTO> {
    const folderToUpdate = await this._storageItemRepository.findOneById(dto.id, dto.ownerId);

    if (!folderToUpdate || !folderToUpdate.isFolder) throw new Error('the folder does not exist.');

    if (folderToUpdate.isInTrash) throw new Error('the folder is in a trash.');

    if (folderToUpdate.isRootFolder) throw new Error('the root folder cannot be updated.');

    if (dto.name) folderToUpdate.rename(dto.name);

    if (dto.parentId) {
      const parentExists = !!(await this._storageItemRepository.findOneById(dto.parentId, dto.ownerId));
      if (!parentExists) throw new Error('the parent folder does not exist.');
      folderToUpdate.move(dto.parentId);
    }

    const saved = await this._storageItemRepository.save(folderToUpdate);

    return makeStorageItemDTO(saved);
  }
}
