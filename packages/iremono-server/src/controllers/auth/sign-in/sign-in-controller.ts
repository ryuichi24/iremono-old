import { SignInRequestDTO, SignInUseCase } from '@iremono/backend-core/dist/use-cases/auth/sign-in';
import { Logger, LoggerFactory } from '@iremono/util/dist/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { cookieHelper } from '../../../shared/utils/cookie-helper';

export class SignInController extends Controller<SignInUseCase> {
  private readonly _logger: Logger;

  constructor(useCase: SignInUseCase, loggerFactory: LoggerFactory) {
    super(useCase);
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle({ body: { email, password }, fullPath, method, host, ip }: HttpRequest): Promise<HttpResponse> {
    const dto: SignInRequestDTO = { email, password };

    const result = await this._useCase.handle(dto);

    this._logger.info(
      'user has signed in',
      `[path="${fullPath}", method="${method}", host="${host}", ip="${ip}", message="user has signed in"]`,
    );

    return this._ok(result, {}, [
      cookieHelper.makeRefreshTokenCookie(result.refreshToken.value, result.refreshToken.expiresIn),
      cookieHelper.makeRefreshTokenCookieForSignOut(result.refreshToken.value, result.refreshToken.expiresIn),
    ]);
  }
}
