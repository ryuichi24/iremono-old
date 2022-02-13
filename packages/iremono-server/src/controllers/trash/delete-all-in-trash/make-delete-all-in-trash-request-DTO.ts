import { DeleteAllInTrashRequestDTO } from '@iremono/backend-core/src/use-cases/trash/delete-all-in-trash';
import { HttpRequest } from '../../../shared/controller-lib';

export const makeDeleteAllInTrashRequestDTO = ({ params: { id }, user }: HttpRequest): DeleteAllInTrashRequestDTO => ({
  ownerId: user.id,
});
