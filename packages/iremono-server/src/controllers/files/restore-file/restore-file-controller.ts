import { RestoreFileRequestDTO, RestoreFileUseCase } from '@iremono/backend-core/dist/use-cases';
import { Logger, LoggerFactory } from '@iremono/util/dist/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class RestoreFileController extends Controller<RestoreFileUseCase> {
  private readonly _logger: Logger;

  constructor(useCase: RestoreFileUseCase, loggerFactory: LoggerFactory) {
    super(useCase);
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const dto: RestoreFileRequestDTO = {
      id: request.params?.id,
      ownerId: request.user?.id,
    };

    await this._useCase.handle(dto);

    this._logger.info(
      'user has restored a file',
      `[path="${request.fullPath}", method="${request.method}", host="${request.host}", ip="${request.ip}", message="user has restored a file"]`,
    );

    return this._noContent();
  }
}
