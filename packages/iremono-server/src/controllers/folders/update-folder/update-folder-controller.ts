import { UpdateFolderUseCase } from '@iremono/backend-core/dist/use-cases';
import { Logger, LoggerFactory } from '@iremono/util/dist/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { makeUpdateFolderRequestDTO } from './make-update-folder-request-DTO';

export class UpdateFolderController extends Controller<UpdateFolderUseCase> {
  private readonly _logger: Logger;
  
  constructor(useCase: UpdateFolderUseCase, loggerFactory: LoggerFactory) {
    super(useCase);
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const dto = makeUpdateFolderRequestDTO(request);
    const result = await this._useCase.handle(dto);

    this._logger.info(
      'user has updated the folder',
      `[path="${request.fullPath}", method="${request.method}", host="${request.host}", ip="${request.ip}", message="user has updated the folder"]`,
    );

    return this._ok(result);
  }
}
