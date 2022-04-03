import { makeStorageItemDTO } from '../../../models';
import { StorageItemRepository } from '../../../repositories';
import { InvalidRequestError } from '../../../shared/utils/errors';
import { IUpdateFolderUseCase, UpdateFolderRequestDTO, UpdateFolderResponseDTO } from './contracts';

export class UpdateFolderUseCase implements IUpdateFolderUseCase {
  private readonly _storageItemRepository: StorageItemRepository;

  constructor(storageItemRepository: StorageItemRepository) {
    this._storageItemRepository = storageItemRepository;
  }

  public async handle(dto: UpdateFolderRequestDTO): Promise<UpdateFolderResponseDTO> {
    const folderToUpdate = await this._storageItemRepository.findOneById(dto.id);

    if (!folderToUpdate || !folderToUpdate.isFolder) throw new InvalidRequestError('the folder does not exist.');

    if (folderToUpdate.isInTrash) throw new InvalidRequestError('the folder is in a trash.');

    if (folderToUpdate.isRootFolder) throw new InvalidRequestError('the root folder cannot be updated.');

    if (folderToUpdate.ownerId !== dto.ownerId)
      throw new InvalidRequestError(`the owner does not match the folder's owner`);

    if (dto.name) folderToUpdate.rename(dto.name);

    if (dto.parentId) {
      const parentExists = !!(await this._storageItemRepository.findOneById(dto.parentId));
      if (!parentExists) throw new InvalidRequestError('the new parent folder does not exist.');
      folderToUpdate.move(dto.parentId);
    }

    const saved = await this._storageItemRepository.save(folderToUpdate);

    return makeStorageItemDTO(saved);
  }
}
