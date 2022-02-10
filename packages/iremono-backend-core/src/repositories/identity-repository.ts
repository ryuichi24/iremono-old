import { Identity } from '../entities';

export interface IdentityRepository {
  save(entity: Identity): Promise<Identity>;
  findOneByEmail(email: string): Promise<Identity | null>;
  findOneById(id: string): Promise<Identity | null>;
}
