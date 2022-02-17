import { ListItemsInTrashRequestDTO } from '@iremono/backend-core/dist/use-cases/trash/list-items-in-trash';
import { HttpRequest } from '../../../shared/controller-lib';

export const makeListItemsInTrashRequestDTO = ({ user }: HttpRequest): ListItemsInTrashRequestDTO => ({
  ownerId: user.id,
});