import { UseCase } from '../../../shared/use-case-lib/interfaces';

export interface SignOutRequestDTO {
  refreshToken: string;
}

export interface SignOutResponseDTO {}

export interface ISignOutUseCase extends UseCase<SignOutRequestDTO, SignOutResponseDTO> {}
