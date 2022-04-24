import { makeStorageItemDTO } from '../../../models';
import { StorageItemRepository } from '../../../repositories';
import { NotExistError } from '../../../shared/utils/errors';
import { isRootFolder } from '../../../shared/utils/is-rootr-folder';
import { IListItemsInFolderUseCase, ListItemsInFolderRequestDTO, ListItemsInFolderResponseDTO } from './contracts';

export class ListItemsInFolderUseCase implements IListItemsInFolderUseCase {
  constructor(private readonly _storageItemRepository: StorageItemRepository) {}

  public async handle(dto: ListItemsInFolderRequestDTO): Promise<ListItemsInFolderResponseDTO> {
    let parentFolder;

    if (isRootFolder(dto.parentId)) {
      parentFolder = await this._storageItemRepository.findRootFolderByOwnerId(dto.ownerId);
    }

    if (!isRootFolder(dto.parentId)) {
      parentFolder = await this._storageItemRepository.findOneById(dto.parentId);
    }

    if (!parentFolder) throw new NotExistError('the parent folder does not exist.');

    const items = await this._storageItemRepository.findByParentId(parentFolder.id, false);

    return {
      folder: makeStorageItemDTO(parentFolder),
      entries: items.map((item) => makeStorageItemDTO(item)),
    };
  }
}
