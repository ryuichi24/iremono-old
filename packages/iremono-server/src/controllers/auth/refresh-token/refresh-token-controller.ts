import { RefreshTokenRequestDTO, RefreshTokenUseCase } from '@iremono/backend-core/dist/use-cases/auth/refresh-token';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { cookieHelper } from '../../../shared/utils/cookie-helper';

export class RefreshTokenController extends Controller<RefreshTokenUseCase> {
  constructor(useCase: RefreshTokenUseCase) {
    super(useCase);
  }

  async handle({ body: { refreshToken }, cookies }: HttpRequest): Promise<HttpResponse> {
    const dto: RefreshTokenRequestDTO = {
      refreshToken: refreshToken || cookies?.refreshToken,
    };

    const result = await this._useCase.handle(dto);

    return this._ok(result, {}, [
      cookieHelper.makeRefreshTokenCookie(result.refreshToken.value, result.refreshToken.expiresIn),
      cookieHelper.makeRefreshTokenCookieForSignOut(result.refreshToken.value, result.refreshToken.expiresIn),
    ]);
  }
}
