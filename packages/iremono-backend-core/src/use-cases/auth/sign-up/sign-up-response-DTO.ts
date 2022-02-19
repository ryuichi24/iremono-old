import { UserDTO } from '../../../models';

export interface SignUpResponseDTO {
  accessToken: string;
  expiresIn: string;
  user: UserDTO;
}
