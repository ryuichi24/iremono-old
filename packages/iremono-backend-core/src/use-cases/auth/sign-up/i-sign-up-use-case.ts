import { UseCase } from '../../../shared/use-case-lib/interfaces';
import { SignUpRequestDTO } from './sign-up-request-DTO';
import { SignUpResponseDTO } from './sign-up-response-DTO';

export interface ISignUpUseCase extends UseCase<SignUpRequestDTO, SignUpResponseDTO> {}
