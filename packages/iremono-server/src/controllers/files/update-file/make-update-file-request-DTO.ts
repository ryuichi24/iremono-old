import { UpdateFileRequestDTO } from '@iremono/backend-core/src/use-cases/files/update-file';
import { HttpRequest } from '../../../shared/controller-lib';

export const makeUpdateFileRequestDTO = ({
  body: { name, parentId },
  user,
  params: { id },
}: HttpRequest): UpdateFileRequestDTO => ({
  name,
  parentId,
  ownerId: user.id,
  id,
});
