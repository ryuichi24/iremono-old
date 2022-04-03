import { UseCase } from '../../../shared/use-case-lib/interfaces';
import { SignInResponseDTO } from './sigin-in-response-DTO';
import { SignInRequestDTO } from './sign-in-request-DTO';

export interface ISignInUseCase extends UseCase<SignInRequestDTO, SignInResponseDTO> {}
