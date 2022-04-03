import { UseCase } from '../../../shared/use-case-lib/interfaces';

export interface RemoveFileRequestDTO {
  id: string;
  ownerId: string;
}

export interface RemoveFileResponseDTO {}

export interface IRemoveFileUseCase extends UseCase<RemoveFileRequestDTO, RemoveFileResponseDTO> {}
