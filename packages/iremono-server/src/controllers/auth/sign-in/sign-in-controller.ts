import { ISignInUseCase } from '@iremono/backend-core/dist/use-cases/auth/sign-in';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { cookieHelper } from '../../../shared/utils/cookie-helper';

export class SignInController extends Controller<ISignInUseCase> {
  constructor(useCase: ISignInUseCase) {
    super(useCase);
  }

  async handle({ body: { email, password } }: HttpRequest): Promise<HttpResponse> {
    const result = await this._useCase.handle({ email, password });

    return this._ok(result, {}, [
      cookieHelper.makeRefreshTokenCookie(result.refreshToken.value, result.refreshToken.expiresIn),
      cookieHelper.makeRefreshTokenCookieForSignOut(result.refreshToken.value, result.refreshToken.expiresIn),
    ]);
  }
}
