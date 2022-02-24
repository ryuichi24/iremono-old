import { makeStorageItemDTO } from '../../../models';
import { StorageItemRepository } from '../../../repositories';
import { UseCase } from '../../../shared/use-case-lib';
import { NotExistError } from '../../../shared/utils/errors';
import { ListItemsInTrashRequestDTO } from './list-items-in-trash-request-DTO';
import { ListItemsInTrashResponseDTO } from './list-items-in-trash-response-DTO';

export class ListItemsInTrashUseCase implements UseCase<ListItemsInTrashRequestDTO, ListItemsInTrashResponseDTO> {
  private readonly _storageItemRepository: StorageItemRepository;

  constructor(storageItemRepository: StorageItemRepository) {
    this._storageItemRepository = storageItemRepository;
  }

  public async handle(dto: ListItemsInTrashRequestDTO): Promise<ListItemsInTrashResponseDTO> {
    const rootFolder = await this._storageItemRepository.findRootFolderByOwnerId(dto.ownerId);
    if (!rootFolder) throw new NotExistError('the root folder does not exists.');

    const trashItems = await this._storageItemRepository.findAllDescendantsById(rootFolder.id, dto.ownerId, true);
    const trashItemIds = trashItems.map((trashItem) => trashItem.id);
    const trashItemDTOs = trashItems
      .filter((trashItem) => !trashItemIds.includes(trashItem.parentId!))
      .map((filteredTrashItem) => makeStorageItemDTO(filteredTrashItem));

    return {
      entries: trashItemDTOs,
    };
  }
}
