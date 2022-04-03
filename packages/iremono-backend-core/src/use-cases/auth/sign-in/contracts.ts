import { UserDTO } from '../../../models/User-DTO';
import { UseCase } from '../../../shared/use-case-lib/interfaces';

export interface SignInRequestDTO {
  email: string;
  password: string;
}

export interface SignInResponseDTO {
  accessToken: { value: string; expiresIn: string };
  refreshToken: { value: string; expiresIn: string };
  user: UserDTO;
}

export interface ISignInUseCase extends UseCase<SignInRequestDTO, SignInResponseDTO> {}
