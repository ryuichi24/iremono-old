import { GetFolderRequestDTO } from '@iremono/backend-core/dist/use-cases/folders';
import { HttpRequest } from '../../../shared/controller-lib';

export const makeGetFolderRequestDTO = ({ user, params: { id } }: HttpRequest): GetFolderRequestDTO => ({
  id,
  ownerId: user.id,
});
