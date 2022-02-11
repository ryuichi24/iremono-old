import { RestoreFolderUseCase } from '@iremono/backend-core/src/use-cases';
import { Logger, LoggerFactory } from '@iremono/util/src/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { makeRestoreFolderRequestDTO } from './make-restore-folder-request-DTO';

export class RestoreFolderController extends Controller<RestoreFolderUseCase> {
  private readonly _logger: Logger;
  constructor(useCase: RestoreFolderUseCase, loggerFactory: LoggerFactory) {
    super(useCase);
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const dto = makeRestoreFolderRequestDTO(request);
    await this._useCase.handle(dto);

    this._logger.info(
      'user has restored a folder',
      `[path="${request.fullPath}", method="${request.method}", host="${request.host}", ip="${request.ip}", message="user has restored a folder"]`,
    );

    return this._noContent();
  }
}
