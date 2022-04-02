import { RefreshTokenRequestDTO, RefreshTokenUseCase } from '@iremono/backend-core/dist/use-cases/auth/refresh-token';
import { Logger, LoggerFactory } from '@iremono/util/dist/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { cookieHelper } from '../../../shared/utils/cookie-helper';

export class RefreshTokenController extends Controller<RefreshTokenUseCase> {
  private readonly _logger: Logger;

  constructor(useCase: RefreshTokenUseCase, loggerFactory: LoggerFactory) {
    super(useCase);
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle({ body: { refreshToken }, cookies, fullPath, method, host, ip }: HttpRequest): Promise<HttpResponse> {
    const dto: RefreshTokenRequestDTO = {
      refreshToken: refreshToken || cookies?.refreshToken,
    };

    const result = await this._useCase.handle(dto);

    this._logger.info(
      'user has refreshed his/her token',
      `[path="${fullPath}", method="${method}", host="${host}", ip="${ip}", message="user has refreshed his/her token"]`,
    );

    return this._ok(result, {}, [
      cookieHelper.makeRefreshTokenCookie(result.refreshToken.value, result.refreshToken.expiresIn),
      cookieHelper.makeRefreshTokenCookieForSignOut(result.refreshToken.value, result.refreshToken.expiresIn),
    ]);
  }
}
