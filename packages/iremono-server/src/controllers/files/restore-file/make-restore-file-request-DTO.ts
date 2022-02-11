import { RestoreFileRequestDTO } from '@iremono/backend-core/src/use-cases/files/restore-file';
import { HttpRequest } from '../../../shared/controller-lib';

export const makeRestoreFileRequestDTO = ({ params: { id }, user }: HttpRequest): RestoreFileRequestDTO => ({
  id,
  ownerId: user.id,
});
