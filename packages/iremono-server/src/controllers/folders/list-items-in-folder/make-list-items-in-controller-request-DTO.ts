import { ListItemsInFolderRequestDTO } from '@iremono/backend-core/src/use-cases/folders/list-items-in-folder';
import { HttpRequest } from '../../../shared/controller-lib';

export const makeListItemsInFolderRequestDTO = ({
  user,
  params: { id },
}: HttpRequest): ListItemsInFolderRequestDTO => ({
  id,
  ownerId: user.id,
});
