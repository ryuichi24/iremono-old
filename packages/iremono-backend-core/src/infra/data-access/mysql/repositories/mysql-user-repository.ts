import { LoggerFactory } from '@iremono/util';
import { User } from '../../../../entities';
import { UserRepository } from '../../../../repositories';
import { MysqlRepository } from './mysql-repository';

export class MysqlUserRepository extends MysqlRepository<User> implements UserRepository {
  constructor(loggerFactory: LoggerFactory) {
    super(loggerFactory);
  }

  public async findOneByEmail(email: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE email = ?;';
    const values = [email];
    const result = await this._query(query, values);
    const user = (result[0] as any)[0];
    if (!user) return null;

    return this._toEntity(user);
  }

  public async findOneById(id: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE id = ?;';
    const values = [id];
    const result = await this._query(query, values);

    const user = (result[0] as any)[0];
    if (!user) return null;

    return this._toEntity(user);
  }

  protected async _insert(entity: User) {
    const query = 'INSERT INTO users (id, email, password) VALUES (?, ?, ?);';
    const values = [entity.id, entity.email, entity.hashedPassword];
    await this._query(query, values);

    return entity;
  }

  protected async _update(entity: User) {
    const query = 'UPDATE users SET email = ?, password = ?, updated_at = ? WHERE id = ?;';
    const values = [entity.email, entity.hashedPassword, entity.updatedAt, entity.id];
    await this._query(query, values);

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
