import { makeStorageItemDTO } from '../../../models';
import { StorageItemRepository } from '../../../repositories';
import { UseCase } from '../../../shared/use-case-lib';
import { InvalidRequestError } from '../../../shared/utils/errors';
import { DeleteFolderInTrashRequestDTO } from './delete-folder-in-trash-request-DTO';
import { DeleteFolderInTrashResponseDTO } from './delete-folder-in-trash-response-DTO';

export class DeleteFolderInTrashUseCase
  implements UseCase<DeleteFolderInTrashRequestDTO, DeleteFolderInTrashResponseDTO>
{
  private readonly _storageItemRepository: StorageItemRepository;

  constructor(storageItemRepository: StorageItemRepository) {
    this._storageItemRepository = storageItemRepository;
  }

  public async handle(dto: DeleteFolderInTrashRequestDTO): Promise<DeleteFolderInTrashResponseDTO> {
    const folderInTrashToDelete = await this._storageItemRepository.findOneById(dto.id, dto.ownerId);

    if (!folderInTrashToDelete || !folderInTrashToDelete.isFolder)
      throw new InvalidRequestError('the folder does not exist in trash.');

    const allDescendants = await this._storageItemRepository.findAllDescendantsById(dto.id, dto.ownerId, true);

    await Promise.all(allDescendants.map(async (descendant) => await this._storageItemRepository.remove(descendant)));

    await this._storageItemRepository.remove(folderInTrashToDelete);

    return {
      deletedFiles: allDescendants
        .map((descendant) => makeStorageItemDTO(descendant))
        .filter((itemDTO) => !itemDTO.isFolder),
    };
  }
}
