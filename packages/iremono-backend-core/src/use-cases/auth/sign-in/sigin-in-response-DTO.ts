import { UserDTO } from '../../../models';

export interface SignInResponseDTO {
  accessToken: { value: string; expiresIn: string };
  refreshToken: { value: string; expiresIn: string };
  user: UserDTO;
}
