import { StorageItemDTO } from '../../../models/storage-item-DTO';
import { UseCase } from '../../../shared/use-case-lib/interfaces';

export interface UpdateFolderRequestDTO {
  id: string;
  name: string;
  parentId: string;
  ownerId: string;
}

export interface UpdateFolderResponseDTO extends StorageItemDTO {}

export interface IUpdateFolderUseCase extends UseCase<UpdateFolderRequestDTO, UpdateFolderResponseDTO> {}
