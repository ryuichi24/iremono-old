import { DownloadFileRequestDTO } from '@iremono/backend-core/src/use-cases/files/download-file';
import { HttpRequest } from '../../../shared/controller-lib';

export const makeDownloadFileRequestDTO = ({ user, params: { id } }: HttpRequest): DownloadFileRequestDTO => ({
  ownerId: user.id,
  id,
});
