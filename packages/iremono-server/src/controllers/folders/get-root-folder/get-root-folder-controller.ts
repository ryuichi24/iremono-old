import { GetRootFolderUseCase } from '@iremono/backend-core/dist/use-cases';
import { Logger, LoggerFactory } from '@iremono/util/dist/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { makeGetRootFolderRequestDTO } from './make-get-root-folder-request-DTO';

export class GetRootFolderController extends Controller<GetRootFolderUseCase> {
  private readonly _logger: Logger;

  constructor(useCase: GetRootFolderUseCase, loggerFactory: LoggerFactory) {
    super(useCase);
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const dto = makeGetRootFolderRequestDTO(request);
    const result = await this._useCase.handle(dto);

    this._logger.info(
      'user has requested for root folder',
      `[path="${request.fullPath}", method="${request.method}", host="${request.host}", ip="${request.ip}", message="user has requested for root folder"]`,
    );

    return this._ok(result);
  }
}
