import { StreamVideoRequestDTO } from '@iremono/backend-core/dist/use-cases/files/stream-video';
import { HttpRequest } from '../../../shared/controller-lib';

export const makeStreamVideoRequestDTO = ({
  params: { id },
  query: { token },
}: HttpRequest): StreamVideoRequestDTO => ({
  streamFileToken: token,
  id,
});
