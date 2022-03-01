import { LoggerFactory } from '@iremono/util';
import { User } from '../../../../entities';
import { UserRepository } from '../../../../repositories';
import { SqliteRepository } from './sqlite-repository';

export class MysqlUserRepository extends SqliteRepository<User> implements UserRepository {
  constructor(loggerFactory: LoggerFactory) {
    super(loggerFactory);
  }

  public async findOneByEmail(email: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE email = ?;';
    const values = [email];
    const user = await this._readOneQuery(query, values);
    if (!user) return null;

    return this._toEntity(user);
  }

  public async findOneById(id: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE id = ?;';
    const values = [id];
    const user = await this._readOneQuery(query, values);
    if (!user) return null;

    return this._toEntity(user);
  }

  protected async _insert(entity: User) {
    const query = 'INSERT INTO users (id, email, password, created_at, updated_at) VALUES (?, ?, ?, ?, ?);';
    const values = [entity.id, entity.email, entity.hashedPassword, entity.createdAt, entity.updatedAt];
    await this._writeQuery(query, values);

    return entity;
  }

  protected async _update(entity: User) {
    const query = 'UPDATE users SET email = ?, password = ?, updated_at = ? WHERE id = ?;';
    const values = [entity.email, entity.hashedPassword, entity.updatedAt, entity.id];
    await this._writeQuery(query, values);

    return entity;
  }

  protected _toEntity(userRaw: any) {
    return new User(
      {
        email: userRaw.email,
        password: userRaw.password,
        encryptionKeyInitializationVector: userRaw.encryption_key_initialization_vector,
        createdAt: userRaw.created_at,
        updatedAt: userRaw.updated_at,
      },
      userRaw.id,
    );
  }
}
