import { CreateFolderRequestDTO } from '@iremono/backend-core/dist/use-cases/folders/create-folder';
import { HttpRequest } from '../../../shared/controller-lib';

export const makeCreateFolderRequestDTO = ({
  body: { name, parentId },
  user: { id },
}: HttpRequest): CreateFolderRequestDTO => ({
  name,
  parentId,
  ownerId: id,
});
