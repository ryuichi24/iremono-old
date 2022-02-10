import { Identity } from '../../../../../entities';
import { IdentityRepository } from '../../../../../repositories';

interface IdentityRow {
  id: string;
  email: string;
  password: string;
}
const identityTables: IdentityRow[] = [];

export const constructMockIdentityRepository = (): IdentityRepository => ({
  save: async (entity: Identity) => {
    identityTables.push({ id: entity.id, email: entity.email, password: entity.hashedPassword });
    return entity;
  },
  findOneByEmail: async (email: string) => {
    const identity = identityTables.find((identity) => identity.email === email);
    if (!identity) return null;

    return new Identity(
      {
        email: identity.email,
        password: identity.password,
      },
      identity.id,
    );
  },
  findOneById: async (id: string) => {
    const identity = identityTables.find((identity) => identity.id === id);
    if (!identity) return null;

    return new Identity(
      {
        email: identity.email,
        password: identity.password,
      },
      identity.id,
    );
  },
});
