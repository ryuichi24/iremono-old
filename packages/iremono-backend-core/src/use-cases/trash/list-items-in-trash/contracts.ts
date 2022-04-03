import { StorageItemDTO } from '../../../models/storage-item-DTO';
import { UseCase } from '../../../shared/use-case-lib/interfaces';

export interface ListItemsInTrashRequestDTO {
  ownerId: string;
  folderType: 'normal' | 'crypto';
}

export interface ListItemsInTrashResponseDTO {
  entries: StorageItemDTO[];
}

export interface IListItemsInTrashUseCase extends UseCase<ListItemsInTrashRequestDTO, ListItemsInTrashResponseDTO> {}
