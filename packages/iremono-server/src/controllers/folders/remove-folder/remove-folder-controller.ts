import { RemoveFolderUseCase } from '@iremono/backend-core/dist/use-cases';
import { Logger, LoggerFactory } from '@iremono/util/dist/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { makeRemoveFolderRequestDTO } from './make-remove-folder-request-DTO';

export class RemoveFolderController extends Controller<RemoveFolderUseCase> {
  private readonly _logger: Logger;
  
  constructor(useCase: RemoveFolderUseCase, loggerFactory: LoggerFactory) {
    super(useCase);
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const dto = makeRemoveFolderRequestDTO(request);
    await this._useCase.handle(dto);

    this._logger.info(
      'user has removed a folder',
      `[path="${request.fullPath}", method="${request.method}", host="${request.host}", ip="${request.ip}", message="user has removed a folder"]`,
    );

    return this._noContent();
  }
}
