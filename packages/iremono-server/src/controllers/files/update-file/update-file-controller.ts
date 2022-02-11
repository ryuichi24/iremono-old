import { UpdateFileUseCase } from '@iremono/backend-core/src/use-cases';
import { Logger, LoggerFactory } from '@iremono/util/src/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { makeUpdateFileRequestDTO } from './make-update-file-request-DTO';

export class UpdateFileController extends Controller<UpdateFileUseCase> {
  private readonly _logger: Logger;
  
  constructor(useCase: UpdateFileUseCase, loggerFactory: LoggerFactory) {
    super(useCase);
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const dto = makeUpdateFileRequestDTO(request);
    const result = await this._useCase.handle(dto);

    this._logger.info(
      'user has updated the file',
      `[path="${request.fullPath}", method="${request.method}", host="${request.host}", ip="${request.ip}", message="user has updated the file"]`,
    );

    return this._ok(result);
  }
}
