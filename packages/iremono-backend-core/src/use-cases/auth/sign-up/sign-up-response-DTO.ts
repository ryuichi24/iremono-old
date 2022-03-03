import { UserDTO } from '../../../models';

export interface SignUpResponseDTO {
  accessToken: { value: string; expiresIn: string };
  refreshToken: { value: string; expiresIn: string };
  user: UserDTO;
}
