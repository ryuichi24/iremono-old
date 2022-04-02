import { SignInRequestDTO, SignInUseCase } from '@iremono/backend-core/dist/use-cases/auth/sign-in';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { cookieHelper } from '../../../shared/utils/cookie-helper';

export class SignInController extends Controller<SignInUseCase> {
  constructor(useCase: SignInUseCase) {
    super(useCase);
  }

  async handle({ body: { email, password } }: HttpRequest): Promise<HttpResponse> {
    const dto: SignInRequestDTO = { email, password };

    const result = await this._useCase.handle(dto);

    return this._ok(result, {}, [
      cookieHelper.makeRefreshTokenCookie(result.refreshToken.value, result.refreshToken.expiresIn),
      cookieHelper.makeRefreshTokenCookieForSignOut(result.refreshToken.value, result.refreshToken.expiresIn),
    ]);
  }
}
