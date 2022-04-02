import { SignUpRequestDTO, SignUpUseCase } from '@iremono/backend-core/dist/use-cases/auth';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { cookieHelper } from '../../../shared/utils/cookie-helper';

export class SignUpController extends Controller<SignUpUseCase> {
  constructor(useCase: SignUpUseCase) {
    super(useCase);
  }

  async handle({ body: { email, password } }: HttpRequest): Promise<HttpResponse> {
    const dto: SignUpRequestDTO = {
      email,
      password,
    };

    const result = await this._useCase.handle(dto);

    return this._created(result, {}, [
      cookieHelper.makeRefreshTokenCookie(result.refreshToken.value, result.refreshToken.expiresIn),
      cookieHelper.makeRefreshTokenCookieForSignOut(result.refreshToken.value, result.refreshToken.expiresIn),
    ]);
  }
}
