import { StorageItemDTO } from '../../../models/storage-item-DTO';
import { UseCase } from '../../../shared/use-case-lib/interfaces';

export interface CreateRootFolderRequestDTO {
  name: string;
  ownerId: string;
  folderType: 'normal' | 'crypto';
  clientEncryptionKey?: string;
}

export interface CreateRootFolderResponseDTO extends StorageItemDTO {}

export interface ICreateRootFolderUseCase extends UseCase<CreateRootFolderRequestDTO, CreateRootFolderResponseDTO> {}
