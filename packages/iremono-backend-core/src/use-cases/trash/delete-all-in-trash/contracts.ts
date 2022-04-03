import { StorageItemDTO } from '../../../models/storage-item-DTO';
import { UseCase } from '../../../shared/use-case-lib/interfaces';

export interface DeleteAllInTrashRequestDTO {
  ownerId: string;
}

export interface DeleteAllInTrashResponseDTO {
  deletedFiles: StorageItemDTO[];
}

export interface IDeleteAllInTrashUseCase extends UseCase<DeleteAllInTrashRequestDTO, DeleteAllInTrashResponseDTO> {}
