import { DeleteFileInTrashRequestDTO } from '@iremono/backend-core/src/use-cases/trash/delete-file-in-trash';
import { HttpRequest } from '../../../shared/controller-lib';

export const makeDeleteFileInTrashRequestDTO = ({
  params: { id },
  user,
}: HttpRequest): DeleteFileInTrashRequestDTO => ({
  id,
  ownerId: user.id,
});
