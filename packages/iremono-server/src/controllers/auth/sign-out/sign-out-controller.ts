import { SignOutRequestDTO, SignOutUseCase } from '@iremono/backend-core/dist/use-cases/auth/sign-out';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { cookieHelper } from '../../../shared/utils/cookie-helper';

export class SignOutController extends Controller<SignOutUseCase> {
  constructor(useCase: SignOutUseCase) {
    super(useCase);
  }

  async handle({ cookies }: HttpRequest): Promise<HttpResponse> {
    const dto: SignOutRequestDTO = { refreshToken: cookies?.refreshToken };

    const result = await this._useCase.handle(dto);

    return this._ok(result, {}, [
      cookieHelper.makeRefreshTokenExpiredCookie(),
      cookieHelper.makeRefreshTokenExpiredCookieForSignOut(),
    ]);
  }
}
