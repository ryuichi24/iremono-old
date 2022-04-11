import { makeStorageItemDTO } from '../../../models';
import { StorageItemRepository } from '../../../repositories';
import { InvalidRequestError } from '../../../shared/utils/errors';
import {
  DeleteFolderInTrashRequestDTO,
  DeleteFolderInTrashResponseDTO,
  IDeleteFolderInTrashUseCase,
} from './contracts';

export class DeleteFolderInTrashUseCase implements IDeleteFolderInTrashUseCase {
  constructor(private readonly _storageItemRepository: StorageItemRepository) {}

  public async handle(dto: DeleteFolderInTrashRequestDTO): Promise<DeleteFolderInTrashResponseDTO> {
    const folderInTrashToDelete = await this._storageItemRepository.findOneById(dto.id);

    if (!folderInTrashToDelete || !folderInTrashToDelete.isFolder)
      throw new InvalidRequestError('the folder does not exist in trash.');

    if (folderInTrashToDelete.ownerId !== dto.ownerId)
      throw new InvalidRequestError(`the owner does not match the folder's owner`);

    const allDescendants = await this._storageItemRepository.findAllDescendantsById(folderInTrashToDelete.id, true);

    await Promise.all(allDescendants.map(async (descendant) => await this._storageItemRepository.remove(descendant)));

    await this._storageItemRepository.remove(folderInTrashToDelete);

    return {
      deletedFiles: allDescendants
        .map((descendant) => makeStorageItemDTO(descendant))
        .filter((itemDTO) => !itemDTO.isFolder),
    };
  }
}
