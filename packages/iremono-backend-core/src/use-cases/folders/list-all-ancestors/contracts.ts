import { StorageItemDTO } from '../../../models/storage-item-DTO';
import { UseCase } from '../../../shared/use-case-lib/interfaces';

export interface ListAllAncestorsRequestDTO {
  id: string;
  ownerId: string;
}

export interface ListAllAncestorsResponseDTO {
  entries: StorageItemDTO[];
}

export interface IListAllAncestorsUseCase extends UseCase<ListAllAncestorsRequestDTO, ListAllAncestorsResponseDTO> {}
