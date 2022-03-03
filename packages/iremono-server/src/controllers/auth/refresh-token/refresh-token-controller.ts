import { RefreshTokenUseCase } from '@iremono/backend-core/dist/use-cases/auth/refresh-token';
import { Logger, LoggerFactory } from '@iremono/util/dist/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { cookieHelper } from '../../../shared/utils/cookie-helper';
import { makeRefreshTokenRequestDTO } from './make-refresh-token-request-DTO';

export class RefreshTokenController extends Controller<RefreshTokenUseCase> {
  private readonly _logger: Logger;

  constructor(useCase: RefreshTokenUseCase, loggerFactory: LoggerFactory) {
    super(useCase);
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const dto = makeRefreshTokenRequestDTO(request);
    const result = await this._useCase.handle(dto);

    this._logger.info(
      'user has refreshed his/her token',
      `[path="${request.fullPath}", method="${request.method}", host="${request.host}", ip="${request.ip}", message="user has refreshed his/her token"]`,
    );

    return this._ok(result, {}, [
      cookieHelper.makeRefreshTokenCookie(result.refreshToken.value, result.refreshToken.expiresIn),
    ]);
  }
}
