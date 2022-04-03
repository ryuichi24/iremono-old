import { StorageItemDTO } from '../../../models/storage-item-DTO';
import { UseCase } from '../../../shared/use-case-lib/interfaces';

export interface DeleteFolderInTrashRequestDTO {
  id: string;
  ownerId: string;
}

export interface DeleteFolderInTrashResponseDTO {
  deletedFiles: StorageItemDTO[];
}

export interface IDeleteFolderInTrashUseCase
  extends UseCase<DeleteFolderInTrashRequestDTO, DeleteFolderInTrashResponseDTO> {}
