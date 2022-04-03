import { UserDTO } from '../../../models/User-DTO';
import { UseCase } from '../../../shared/use-case-lib/interfaces';

export interface SignUpRequestDTO {
  email: string;
  password: string;
}

export interface SignUpResponseDTO {
  accessToken: { value: string; expiresIn: string };
  refreshToken: { value: string; expiresIn: string };
  user: UserDTO;
}

export interface ISignUpUseCase extends UseCase<SignUpRequestDTO, SignUpResponseDTO> {}
