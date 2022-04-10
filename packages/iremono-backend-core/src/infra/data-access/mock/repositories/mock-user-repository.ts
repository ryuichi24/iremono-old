import { LoggerFactory } from '@iremono/util/dist/logger';
import { User } from '../../../../entities';
import { UserRepository } from '../../../../repositories';

interface UserRow {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
const userTable: UserRow[] = [];

export const constructMockUserRepository = (loggerFactory?: LoggerFactory): UserRepository => {
  const logger = loggerFactory?.createLogger('MockUserRepository');

  const _insert = async (entity: User) => {
    const userRow = makeUserRowFromEntity(entity);
    userTable.push(userRow);
  };

  const _update = async (entity: User) => {
    const indexOfEntity = userTable.findIndex((row) => row.id === entity.id);
    const entityRowToUpdate = userTable.splice(indexOfEntity, 1)[0];

    entityRowToUpdate.email = entity.email;
    entityRowToUpdate.password = entity.hashedPassword;
    entityRowToUpdate.createdAt = entity.createdAt!;
    entityRowToUpdate.updatedAt = entity.updatedAt!;

    userTable.push(entityRowToUpdate);
  };

  const save = async (entity: User) => {
    const entityExists = !!(await findOneById(entity.id));

    if (!entityExists) await _insert(entity);
    if (entityExists) await _update(entity);

    logger?.debug(`an user has been saved.`, `[user-memory-table="${JSON.stringify(userTable, null, '\t')}"]`);

    return entity;
  };

  const findOneByEmail = async (email: string) => {
    const userRow = userTable.find((User) => User.email === email);
    if (!userRow) return null;

    return makeUserEntityFromRow(userRow);
  };

  const findOneById = async (id: string) => {
    const userRow = userTable.find((User) => User.id === id);
    if (!userRow) return null;

    return makeUserEntityFromRow(userRow);
  };

  return {
    save,
    findOneByEmail,
    findOneById,
  };
};

const makeUserEntityFromRow = (row: UserRow): User =>
  new User(
    {
      email: row.email,
      password: row.password,
    },
    row.id,
  );

const makeUserRowFromEntity = (entity: User): UserRow => ({
  id: entity.id,
  email: entity.email,
  password: entity.hashedPassword,
  createdAt: entity.createdAt!,
  updatedAt: entity.updatedAt!,
});
