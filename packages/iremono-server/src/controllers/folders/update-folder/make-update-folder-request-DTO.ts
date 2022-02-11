import { HttpRequest } from '../../../shared/controller-lib';
import { UpdateFolderRequestDTO } from '@iremono/backend-core/src/use-cases/folders/update-folder';

export const makeUpdateFolderRequestDTO = ({
  body: { name, parentId },
  user,
  params: { id },
}: HttpRequest): UpdateFolderRequestDTO => ({
  name,
  parentId,
  ownerId: user.id,
  id,
});
