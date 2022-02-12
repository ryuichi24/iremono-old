import { StorageItemDTO } from '../../../models';

export interface DeleteFolderInTrashResponseDTO {
  deletedFiles: StorageItemDTO[];
}
