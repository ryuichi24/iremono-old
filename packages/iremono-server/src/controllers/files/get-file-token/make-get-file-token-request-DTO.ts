import { GetFileTokenRequestDTO } from '@iremono/backend-core/dist/use-cases/files/get-file-token';
import { HttpRequest } from '../../../shared/controller-lib';

export const makeGetFileTokenRequestDTO = ({
  user,
  params: { id },
  query: { type },
}: HttpRequest): GetFileTokenRequestDTO => ({
  ownerId: user.id,
  id,
  tokenType: type,
});