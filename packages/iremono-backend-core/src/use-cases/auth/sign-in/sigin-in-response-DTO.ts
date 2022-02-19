import { UserDTO } from '../../../models';

export interface SignInResponseDTO {
  accessToken: string;
  expiresIn: string;
  user: UserDTO;
}
