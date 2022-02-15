import { RemoveFileUseCase } from '@iremono/backend-core/dist/use-cases';
import { Logger, LoggerFactory } from '@iremono/util/dist/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { makeRemoveFileRequestDTO } from './make-remove-file-request-DTO';

export class RemoveFileController extends Controller<RemoveFileUseCase> {
  private readonly _logger: Logger;

  constructor(useCase: RemoveFileUseCase, loggerFactory: LoggerFactory) {
    super(useCase);
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const dto = makeRemoveFileRequestDTO(request);
    await this._useCase.handle(dto);

    this._logger.info(
      'user has removed a file',
      `[path="${request.fullPath}", method="${request.method}", host="${request.host}", ip="${request.ip}", message="user has removed a file"]`,
    );

    return this._noContent();
  }
}
