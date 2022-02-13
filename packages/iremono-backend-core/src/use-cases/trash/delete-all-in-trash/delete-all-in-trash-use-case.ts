import { makeStorageItemDTO } from '../../../models';
import { StorageItemRepository } from '../../../repositories';
import { UseCase } from '../../../shared/use-case-lib';
import { DeleteAllInTrashRequestDTO } from './delete-all-in-trash-request-DTO';
import { DeleteAllInTrashResponseDTO } from './delete-all-in-trash-response-DTO';

export class DeleteAllInTrashUseCase implements UseCase<DeleteAllInTrashRequestDTO, DeleteAllInTrashResponseDTO> {
  private readonly _storageItemRepository: StorageItemRepository;

  constructor(storageItemRepository: StorageItemRepository) {
    this._storageItemRepository = storageItemRepository;
  }

  public async handle(dto: DeleteAllInTrashRequestDTO): Promise<DeleteAllInTrashResponseDTO> {
    const trashItems = await this._storageItemRepository.findAllDescendantsById('0', dto.ownerId, true);
    await Promise.all(trashItems.map(async (trashItem) => await this._storageItemRepository.remove(trashItem)));

    return {
      deletedFiles: trashItems
        .filter((trashItem) => !trashItem.isFolder)
        .map((trashItem) => makeStorageItemDTO(trashItem)),
    };
  }
}
