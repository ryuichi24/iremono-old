import { RefreshTokenRequestDTO } from '@iremono/backend-core/dist/use-cases/auth/refresh-token';
import { HttpRequest } from '../../../shared/controller-lib';

export const makeRefreshTokenRequestDTO = ({
  body: { refreshToken },
  cookies,
}: HttpRequest): RefreshTokenRequestDTO => ({
  refreshToken: refreshToken || cookies?.refreshToken,
});
