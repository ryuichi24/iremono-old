import { RemoveFolderRequestDTO } from '@iremono/backend-core/dist/use-cases/folders/remove-folder';
import { HttpRequest } from '../../../shared/controller-lib';

export const makeRemoveFolderRequestDTO = ({ params: { id }, user }: HttpRequest): RemoveFolderRequestDTO => ({
  id,
  ownerId: user.id,
});
