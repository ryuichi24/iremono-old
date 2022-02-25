import { ListAllAncestorsRequestDTO } from '@iremono/backend-core/dist/use-cases/folders';
import { HttpRequest } from '../../../shared/controller-lib';

export const makeListAllAncestorsRequestDTO = ({ user, params: { id } }: HttpRequest): ListAllAncestorsRequestDTO => ({
  id,
  ownerId: user.id,
});
