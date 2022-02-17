import { User } from '../entities';

export interface UserRepository {
  save(entity: User): Promise<User>;
  findOneByEmail(email: string): Promise<User | null>;
  findOneById(id: string): Promise<User | null>;
}
