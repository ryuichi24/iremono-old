import { UseCase } from '../../../shared/use-case-lib/interfaces';
import { SignOutRequestDTO } from './sign-out-request-DTO';
import { SignOutResponseDTO } from './sign-out-response-DTO';

export interface ISignOutUseCase extends UseCase<SignOutRequestDTO, SignOutResponseDTO> {}
