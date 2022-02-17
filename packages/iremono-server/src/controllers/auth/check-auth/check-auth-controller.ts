import { CheckAuthUseCase } from '@iremono/backend-core/dist/use-cases/auth/check-auth';
import { Logger, LoggerFactory } from '@iremono/util/dist/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { makeCheckAuthRequestDTO } from './make-check-auth-DTO';

export class CheckAuthController extends Controller<CheckAuthUseCase> {
  private readonly _logger: Logger;

  constructor(useCase: CheckAuthUseCase, loggerFactory: LoggerFactory) {
    super(useCase);
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const dto = makeCheckAuthRequestDTO(request);
    const result = await this._useCase.handle(dto);

    this._logger.info(
      'user has checked his/her auth',
      `[path="${request.fullPath}", method="${request.method}", host="${request.host}", ip="${request.ip}", message="user has checked his/her auth"]`,
    );

    return this._ok(result);
  }
}
