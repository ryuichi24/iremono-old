import { CreateRootFolderUseCase } from '@iremono/backend-core/dist/use-cases';
import { Logger, LoggerFactory } from '@iremono/util/dist/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { makeCreateRootFolderRequestDTO } from './make-create-root-folder-request-DTO';

export class CreateRootFolderController extends Controller<CreateRootFolderUseCase> {
  private readonly _logger: Logger;

  constructor(useCase: CreateRootFolderUseCase, loggerFactory: LoggerFactory) {
    super(useCase);
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const dto = makeCreateRootFolderRequestDTO(request);
    const result = await this._useCase.handle(dto);

    this._logger.info(
      'user has created a new root folder',
      `[path="${request.fullPath}", method="${request.method}", host="${request.host}", ip="${request.ip}", message="user has created a new root folder"]`,
    );

    return this._created(result);
  }
}
