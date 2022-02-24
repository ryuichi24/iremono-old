import { makeStorageItemDTO } from '../../../models';
import { StorageItemRepository } from '../../../repositories';
import { UseCase } from '../../../shared/use-case-lib';
import { NotExistError } from '../../../shared/utils/errors';
import { isRootFolder } from '../../../shared/utils/is-rootr-folder';
import { ListItemsInFolderRequestDTO } from './list-items-in-folder-request-DTO';
import { ListItemsInFolderResponseDTO } from './list-items-in-folder-response-DTO';

export class ListItemsInFolderUseCase implements UseCase<ListItemsInFolderRequestDTO, ListItemsInFolderResponseDTO> {
  private readonly _storageItemRepository: StorageItemRepository;

  constructor(storageItemRepository: StorageItemRepository) {
    this._storageItemRepository = storageItemRepository;
  }

  public async handle(dto: ListItemsInFolderRequestDTO): Promise<ListItemsInFolderResponseDTO> {
    let parentFolder;

    if (isRootFolder(dto.parentId)) {
      parentFolder = await this._storageItemRepository.findRootFolderByOwnerId(dto.ownerId);
    }

    if (!isRootFolder(dto.parentId)) {
      parentFolder = await this._storageItemRepository.findOneById(dto.parentId);
    }

    if (!parentFolder) throw new NotExistError('the parent folder does not exist.');

    const items = await this._storageItemRepository.findByParentId(parentFolder.id, dto.ownerId, false);

    return {
      entries: items.map((item) => makeStorageItemDTO(item)),
    };
  }
}
