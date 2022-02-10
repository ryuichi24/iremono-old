import { CheckIdentityUseCase } from '@iremono/backend-core/src/use-cases/identity/check-identity';
import { Logger, LoggerFactory } from '@iremono/util/src/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { makeCheckIdentityRequestDTO } from './make-check-identity-DTO';

export class CheckIdentityController extends Controller<CheckIdentityUseCase> {
  private readonly _logger: Logger;
  constructor(useCase: CheckIdentityUseCase, loggerFactory: LoggerFactory) {
    super(useCase);
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const dto = makeCheckIdentityRequestDTO(request);
    const result = await this._useCase.handle(dto);

    this._logger.info(
      'user has checked his/her identity',
      `[path="${request.fullPath}", method="${request.method}", host="${request.host}", ip="${request.ip}", message="user has checked his/her identity"]`,
    );

    return this._ok(result);
  }
}
