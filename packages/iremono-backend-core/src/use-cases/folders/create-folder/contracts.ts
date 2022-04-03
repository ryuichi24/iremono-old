import { StorageItemDTO } from '../../../models/storage-item-DTO';
import { UseCase } from '../../../shared/use-case-lib/interfaces';

export interface CreateFolderRequestDTO {
  name: string;
  parentId: string;
  ownerId: string;
}

export interface CreateFolderResponseDTO extends StorageItemDTO {}

export interface ICreateFolderUseCase extends UseCase<CreateFolderRequestDTO, CreateFolderResponseDTO> {}
