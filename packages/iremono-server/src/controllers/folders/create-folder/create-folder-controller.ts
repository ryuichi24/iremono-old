import { CreateFolderUseCase } from '@iremono/backend-core/dist/use-cases';
import { Logger, LoggerFactory } from '@iremono/util/dist/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { makeCreateFolderRequestDTO } from './make-create-folder-request-DTO';

export class CreateFolderController extends Controller<CreateFolderUseCase> {
  private readonly _logger: Logger;
  
  constructor(useCase: CreateFolderUseCase, loggerFactory: LoggerFactory) {
    super(useCase);
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const dto = makeCreateFolderRequestDTO(request);
    const result = await this._useCase.handle(dto);

    this._logger.info(
      'user has created a new folder',
      `[path="${request.fullPath}", method="${request.method}", host="${request.host}", ip="${request.ip}", message="user has created a new folder"]`,
    );

    return this._created(result);
  }
}
