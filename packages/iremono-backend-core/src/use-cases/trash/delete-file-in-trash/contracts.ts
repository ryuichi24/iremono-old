import { StorageItemDTO } from '../../../models/storage-item-DTO';
import { UseCase } from '../../../shared/use-case-lib/interfaces';

export interface DeleteFileInTrashRequestDTO {
  id: string;
  ownerId: string;
}

export interface DeleteFileInTrashResponseDTO {
  deletedFile: StorageItemDTO;
}

export interface IDeleteFileInTrashUseCase extends UseCase<DeleteFileInTrashRequestDTO, DeleteFileInTrashResponseDTO> {}
