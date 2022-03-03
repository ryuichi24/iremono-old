import { SignOutRequestDTO } from '@iremono/backend-core/dist/use-cases/auth/sign-out';
import { HttpRequest } from '../../../shared/controller-lib';

export const makeSignOutRequestDTO = ({ cookies: { refreshToken } }: HttpRequest): SignOutRequestDTO => ({
  refreshToken,
});
