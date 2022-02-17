import { CheckAuthRequestDTO } from '@iremono/backend-core/dist/use-cases/auth/check-auth';
import { HttpRequest } from '../../../shared/controller-lib';

export const makeCheckAuthRequestDTO = ({ user: { id } }: HttpRequest): CheckAuthRequestDTO => ({
  id,
});
