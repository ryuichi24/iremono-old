import { DeleteFolderInTrashRequestDTO } from '@iremono/backend-core/src/use-cases/trash/delete-folder-in-trash';
import { HttpRequest } from '../../../shared/controller-lib';

export const makeDeleteFolderInTrashRequestDTO = ({
  params: { id },
  user,
}: HttpRequest): DeleteFolderInTrashRequestDTO => ({
  id,
  ownerId: user.id,
});
