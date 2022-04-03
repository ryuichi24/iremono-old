import { makeStorageItemDTO } from '../../../models';
import { StorageItemRepository } from '../../../repositories';
import { NotExistError } from '../../../shared/utils/errors';
import { IListItemsInTrashUseCase, ListItemsInTrashRequestDTO, ListItemsInTrashResponseDTO } from './contracts';

export class ListItemsInTrashUseCase implements IListItemsInTrashUseCase {
  private readonly _storageItemRepository: StorageItemRepository;

  constructor(storageItemRepository: StorageItemRepository) {
    this._storageItemRepository = storageItemRepository;
  }

  public async handle(dto: ListItemsInTrashRequestDTO): Promise<ListItemsInTrashResponseDTO> {
    let rootFolder;

    if (dto.folderType === 'normal') {
      rootFolder = await this._storageItemRepository.findRootFolderByOwnerId(dto.ownerId);
    }

    if (dto.folderType === 'crypto') {
      rootFolder = await this._storageItemRepository.findCryptoRootFolderByOwnerId(dto.ownerId);
    }

    if (!rootFolder) throw new NotExistError('the root folder does not exists.');

    const trashItems = await this._storageItemRepository.findAllDescendantsById(rootFolder.id, true);
    const trashItemIds = trashItems.map((trashItem) => trashItem.id);
    const trashItemDTOs = trashItems
      .filter((trashItem) => !trashItemIds.includes(trashItem.parentId!))
      .map((filteredTrashItem) => makeStorageItemDTO(filteredTrashItem));

    return {
      entries: trashItemDTOs,
    };
  }
}
