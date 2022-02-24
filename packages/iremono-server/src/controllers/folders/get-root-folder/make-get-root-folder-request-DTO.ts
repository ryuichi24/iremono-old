import { GetRootFolderRequestDTO } from '@iremono/backend-core/dist/use-cases/folders';
import { HttpRequest } from '../../../shared/controller-lib';

export const makeGetRootFolderRequestDTO = ({ user }: HttpRequest): GetRootFolderRequestDTO => ({
  ownerId: user.id,
});
