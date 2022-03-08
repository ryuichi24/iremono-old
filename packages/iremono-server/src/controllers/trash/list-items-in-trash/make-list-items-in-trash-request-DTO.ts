import { ListItemsInTrashRequestDTO } from '@iremono/backend-core/dist/use-cases/trash/list-items-in-trash';
import { HttpRequest } from '../../../shared/controller-lib';

export const makeListItemsInTrashRequestDTO = ({ user, query: { type } }: HttpRequest): ListItemsInTrashRequestDTO => ({
  ownerId: user.id,
  folderType: (type as 'normal' | 'crypto') || 'normal',
});
