import { GetDownloadFileTokenRequestDTO } from '@iremono/backend-core/dist/use-cases/files/get-download-file-token';
import { HttpRequest } from '../../../shared/controller-lib';

export const makeGetDownloadFileTokenRequestDTO = ({
  user,
  params: { id },
}: HttpRequest): GetDownloadFileTokenRequestDTO => ({
  ownerId: user.id,
  id,
});
