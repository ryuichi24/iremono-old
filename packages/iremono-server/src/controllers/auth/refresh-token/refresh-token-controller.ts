import { IRefreshTokenUseCase } from '@iremono/backend-core/dist/use-cases/auth/refresh-token/contracts';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { cookieHelper } from '../../../shared/utils/cookie-helper';

export class RefreshTokenController extends Controller<IRefreshTokenUseCase> {
  constructor(useCase: IRefreshTokenUseCase) {
    super(useCase);
  }

  async handle({ body: { refreshToken }, cookies }: HttpRequest): Promise<HttpResponse> {
    const result = await this._useCase.handle({
      refreshToken: refreshToken || cookies?.refreshToken,
    });

    return this._ok(result, {}, [
      cookieHelper.makeRefreshTokenCookie(result.refreshToken.value, result.refreshToken.expiresIn),
      cookieHelper.makeRefreshTokenCookieForSignOut(result.refreshToken.value, result.refreshToken.expiresIn),
    ]);
  }
}
