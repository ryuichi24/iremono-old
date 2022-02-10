import { Identity } from '../entities';

export interface IdentityDTO {
  id: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const makeIdentityDTO = (identity: Identity): IdentityDTO => ({
  id: identity.id,
  email: identity.email,
  createdAt: identity.createdAt,
  updatedAt: identity.updatedAt,
});
