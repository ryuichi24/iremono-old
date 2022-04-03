import { UseCase } from '../../../shared/use-case-lib/interfaces';

export interface CheckAuthRequestDTO {
  id: string;
}

export interface CheckAuthResponseDTO {
  id: string;
  email: string;
}

export interface ICheckAuthUseCase extends UseCase<CheckAuthRequestDTO, CheckAuthResponseDTO> {}
