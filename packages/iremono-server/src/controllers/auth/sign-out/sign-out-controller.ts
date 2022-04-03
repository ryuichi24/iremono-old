import { ISignOutUseCase } from '@iremono/backend-core/dist/use-cases/auth/sign-out';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { cookieHelper } from '../../../shared/utils/cookie-helper';

export class SignOutController extends Controller<ISignOutUseCase> {
  constructor(useCase: ISignOutUseCase) {
    super(useCase);
  }

  async handle({ cookies }: HttpRequest): Promise<HttpResponse> {
    const result = await this._useCase.handle({ refreshToken: cookies?.refreshToken });

    return this._ok(result, {}, [
      cookieHelper.makeRefreshTokenExpiredCookie(),
      cookieHelper.makeRefreshTokenExpiredCookieForSignOut(),
    ]);
  }
}
