import { ListItemsInFolderRequestDTO } from '@iremono/backend-core/dist/use-cases/folders/list-items-in-folder';
import { HttpRequest } from '../../../shared/controller-lib';

export const makeListItemsInFolderRequestDTO = ({
  user,
  params: { id },
}: HttpRequest): ListItemsInFolderRequestDTO => ({
  parentId: id,
  ownerId: user.id,
});
