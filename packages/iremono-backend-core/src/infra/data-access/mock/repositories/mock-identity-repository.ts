import { LoggerFactory } from '@iremono/util/src/logger';
import { Identity } from '../../../../entities';
import { IdentityRepository } from '../../../../repositories';

interface IdentityRow {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
const identityTable: IdentityRow[] = [];

export const constructMockIdentityRepository = (loggerFactory: LoggerFactory): IdentityRepository => {
  const logger = loggerFactory.createLogger('MockIdentityRepository');

  const _insert = async (entity: Identity) => {
    const identityRow = makeIdentityRowFromEntity(entity);
    identityTable.push(identityRow);
  };

  const _update = async (entity: Identity) => {
    const indexOfEntity = identityTable.findIndex((row) => row.id === entity.id);
    const entityRowToUpdate = identityTable.splice(indexOfEntity, 1)[0];

    entityRowToUpdate.email = entity.email;
    entityRowToUpdate.password = entity.hashedPassword;
    entityRowToUpdate.createdAt = entity.createdAt!;
    entityRowToUpdate.updatedAt = entity.updatedAt!;

    identityTable.push(entityRowToUpdate);
  };

  const save = async (entity: Identity) => {
    const entityExists = !!(await findOneById(entity.id));

    if (!entityExists) await _insert(entity);
    if (entityExists) await _update(entity);

    logger.debug(
      `an identity has been saved.`,
      `[identity-memory-table="${JSON.stringify(identityTable, null, '\t')}"]`,
    );

    return entity;
  };

  const findOneByEmail = async (email: string) => {
    const identityRow = identityTable.find((identity) => identity.email === email);
    if (!identityRow) return null;

    return makeIdentityEntityFromRow(identityRow);
  };

  const findOneById = async (id: string) => {
    const identityRow = identityTable.find((identity) => identity.id === id);
    if (!identityRow) return null;

    return makeIdentityEntityFromRow(identityRow);
  };

  return {
    save,
    findOneByEmail,
    findOneById,
  };
};

const makeIdentityEntityFromRow = (row: IdentityRow): Identity =>
  new Identity({ email: row.email, password: row.password }, row.id);

const makeIdentityRowFromEntity = (entity: Identity): IdentityRow => ({
  id: entity.id,
  email: entity.email,
  password: entity.hashedPassword,
  createdAt: entity.createdAt!,
  updatedAt: entity.updatedAt!,
});
