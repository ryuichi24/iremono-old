import { SignUpRequestDTO, SignUpUseCase } from '@iremono/backend-core/dist/use-cases/auth';
import { LoggerFactory, Logger } from '@iremono/util/dist/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { cookieHelper } from '../../../shared/utils/cookie-helper';

export class SignUpController extends Controller<SignUpUseCase> {
  private readonly _logger: Logger;

  constructor(useCase: SignUpUseCase, loggerFactory: LoggerFactory) {
    super(useCase);
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle({ body: { email, password }, fullPath, method, host, ip }: HttpRequest): Promise<HttpResponse> {
    const dto: SignUpRequestDTO = {
      email,
      password,
    };

    const result = await this._useCase.handle(dto);

    this._logger.info(
      'new user has signed up',
      `[path="${fullPath}", method="${method}", host="${host}", ip="${ip}", message="new user has signed up"]`,
    );

    return this._created(result, {}, [
      cookieHelper.makeRefreshTokenCookie(result.refreshToken.value, result.refreshToken.expiresIn),
      cookieHelper.makeRefreshTokenCookieForSignOut(result.refreshToken.value, result.refreshToken.expiresIn),
    ]);
  }
}
