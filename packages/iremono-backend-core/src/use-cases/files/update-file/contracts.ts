import { StorageItemDTO } from '../../../models/storage-item-DTO';
import { UseCase } from '../../../shared/use-case-lib/interfaces';

export interface UpdateFileRequestDTO {
  id: string;
  name: string;
  parentId?: string;
  ownerId: string;
}

export interface UpdateFileResponseDTO extends StorageItemDTO {}

export interface IUpdateFileUseCase extends UseCase<UpdateFileRequestDTO, UpdateFileResponseDTO> {}
