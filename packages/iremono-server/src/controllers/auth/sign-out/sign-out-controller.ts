import { SignOutRequestDTO, SignOutUseCase } from '@iremono/backend-core/dist/use-cases/auth/sign-out';
import { Logger, LoggerFactory } from '@iremono/util/dist/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { cookieHelper } from '../../../shared/utils/cookie-helper';

export class SignOutController extends Controller<SignOutUseCase> {
  private readonly _logger: Logger;

  constructor(useCase: SignOutUseCase, loggerFactory: LoggerFactory) {
    super(useCase);
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle({ cookies, fullPath, method, host, ip }: HttpRequest): Promise<HttpResponse> {
    const dto: SignOutRequestDTO = { refreshToken: cookies?.refreshToken };

    const result = await this._useCase.handle(dto);

    this._logger.info(
      'user has signed out',
      `[path="${fullPath}", method="${method}", host="${host}", ip="${ip}", message="user has signed out"]`,
    );

    return this._ok(result, {}, [
      cookieHelper.makeRefreshTokenExpiredCookie(),
      cookieHelper.makeRefreshTokenExpiredCookieForSignOut(),
    ]);
  }
}
