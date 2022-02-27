import { StreamVideoRequestDTO } from '@iremono/backend-core/dist/use-cases/files/stream-video';
import { HttpRequest } from '../../../shared/controller-lib';

export const makeStreamVideoRequestDTO = ({ user, params: { id } }: HttpRequest): StreamVideoRequestDTO => ({
  ownerId: user.id,
  id,
});
