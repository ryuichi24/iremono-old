import { StorageItemDTO } from '../../../models/storage-item-DTO';
import { UseCase } from '../../../shared/use-case-lib/interfaces';

export interface ListItemsInFolderRequestDTO {
  parentId: string;
  ownerId: string;
}

export interface ListItemsInFolderResponseDTO {
  folder: StorageItemDTO;
  entries: StorageItemDTO[];
}

export interface IListItemsInFolderUseCase extends UseCase<ListItemsInFolderRequestDTO, ListItemsInFolderResponseDTO> {}
