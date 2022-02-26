import { GetFolderUseCase } from '@iremono/backend-core/dist/use-cases';
import { Logger, LoggerFactory } from '@iremono/util/dist/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { makeGetFolderRequestDTO } from './make-get-folder-request-DTO';

export class GetFolderController extends Controller<GetFolderUseCase> {
  private readonly _logger: Logger;

  constructor(useCase: GetFolderUseCase, loggerFactory: LoggerFactory) {
    super(useCase);
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const dto = makeGetFolderRequestDTO(request);
    const result = await this._useCase.handle(dto);

    this._logger.info(
      'user has requested for folder',
      `[path="${request.fullPath}", method="${request.method}", host="${request.host}", ip="${request.ip}", message="user has requested for folder"]`,
    );

    return this._ok(result);
  }
}
