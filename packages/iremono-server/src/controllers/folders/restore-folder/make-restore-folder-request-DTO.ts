import { RestoreFolderRequestDTO } from '@iremono/backend-core/src/use-cases/folders/restore-folder';
import { HttpRequest } from '../../../shared/controller-lib';

export const makeRestoreFolderRequestDTO = ({ params: { id }, user }: HttpRequest): RestoreFolderRequestDTO => ({
  id,
  ownerId: user.id,
});
