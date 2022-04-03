import { UseCase } from '../../../shared/use-case-lib/interfaces';

export interface RemoveFolderRequestDTO {
  id: string;
  ownerId: string;
}

export interface RemoveFolderResponseDTO {}

export interface IRemoveFolderUseCase extends UseCase<RemoveFolderRequestDTO, RemoveFolderResponseDTO> {}
