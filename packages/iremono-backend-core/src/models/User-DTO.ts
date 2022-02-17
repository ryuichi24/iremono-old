import { User } from '../entities';

export interface UserDTO {
  id: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const makeUserDTO = (User: User): UserDTO => ({
  id: User.id,
  email: User.email,
  createdAt: User.createdAt,
  updatedAt: User.updatedAt,
});
