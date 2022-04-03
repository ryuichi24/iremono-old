import { StorageItemDTO } from '../../../models/storage-item-DTO';
import { UseCase } from '../../../shared/use-case-lib/interfaces';

export interface GetFolderRequestDTO {
  id: string;
  ownerId: string;
  folderType: 'normal' | 'crypto';
}

export interface GetFolderResponseDTO extends StorageItemDTO {}

export interface IGetFolderUseCase extends UseCase<GetFolderRequestDTO, GetFolderResponseDTO> {}
