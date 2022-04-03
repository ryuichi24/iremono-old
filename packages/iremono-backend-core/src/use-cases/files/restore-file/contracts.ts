import { UseCase } from '../../../shared/use-case-lib/interfaces';

export interface RestoreFileRequestDTO {
  id: string;
  ownerId: string;
}

export interface RestoreFileResponseDTO {}

export interface IRestoreFileUseCase extends UseCase<RestoreFileRequestDTO, RestoreFileResponseDTO> {}
