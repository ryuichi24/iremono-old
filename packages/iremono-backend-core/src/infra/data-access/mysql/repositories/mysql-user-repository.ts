import { Logger, LoggerFactory } from '@iremono/util';
import { MysqlDatabase } from '..';
import { User } from '../../../../entities';
import { UserRepository } from '../../../../repositories';

export class MysqlUserRepository implements UserRepository {
  private readonly _logger: Logger;

  constructor(loggerFactory: LoggerFactory) {
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  public async save(entity: User): Promise<User> {
    const entityExists = !!(await this.findOneById(entity.id));

    if (!entityExists) await this._insert(entity);
    if (entityExists) await this._update(entity);

    return entity;
  }

  public async findOneByEmail(email: string): Promise<User | null> {
    const result = await MysqlDatabase.getConnectionPool().query('SELECT * FROM users WHERE email = ?;', [email]);
    const user = (result[0] as any)[0];
    if (!user) return null;

    return new User(
      {
        email: user.email,
        password: user.password,
        encryptionKeyInitializationVector: user.encryption_key_initialization_vector,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
      },
      user.id,
    );
  }

  public async findOneById(id: string): Promise<User | null> {
    const result = await MysqlDatabase.getConnectionPool().query('SELECT * FROM users WHERE id = ?;', [id]);
    const user = (result[0] as any)[0];
    if (!user) return null;

    return new User(
      {
        email: user.email,
        password: user.password,
        encryptionKeyInitializationVector: user.encryption_key_initialization_vector,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
      },
      user.id,
    );
  }

  private async _insert(entity: User) {
    await MysqlDatabase.getConnectionPool().query('INSERT INTO users (id, email, password) VALUES (?, ?, ?);', [
      entity.id,
      entity.email,
      entity.hashedPassword,
    ]);

    return entity;
  }

  private async _update(entity: User) {
    await MysqlDatabase.getConnectionPool().query(
      'UPDATE users SET email = ?, password = ?, updated_at = ? WHERE id = ?;',
      [entity.email, entity.hashedPassword, entity.updatedAt, entity.id],
    );

    return entity;
  }
}
