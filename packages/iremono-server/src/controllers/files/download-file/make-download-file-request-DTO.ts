import { DownloadFileRequestDTO } from '@iremono/backend-core/dist/use-cases/files/download-file';
import { HttpRequest } from '../../../shared/controller-lib';

export const makeDownloadFileRequestDTO = ({
  params: { id },
  query: { token },
}: HttpRequest): DownloadFileRequestDTO => ({
  downloadFileToken: token,
  id,
});
