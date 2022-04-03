import { UseCase } from '../../../shared/use-case-lib/interfaces';

export interface RestoreFolderRequestDTO {
  id: string;
  ownerId: string;
}

export interface RestoreFolderResponseDTO {}

export interface IRestoreFolderUseCase extends UseCase<RestoreFolderRequestDTO, RestoreFolderResponseDTO> {}
