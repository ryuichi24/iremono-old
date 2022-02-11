import { UploadFileUseCase } from '@iremono/backend-core/src/use-cases';
import { Logger, LoggerFactory } from '@iremono/util/src/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { makeUploadFileRequestDTO } from './make-upload-file-request-DTO';

export class UploadFileController extends Controller<UploadFileUseCase> {
  private readonly _logger: Logger;
  constructor(useCase: UploadFileUseCase, loggerFactory: LoggerFactory) {
    super(useCase);
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const dto = makeUploadFileRequestDTO(request);
    const result = await this._useCase.handle(dto);

    this._logger.info(
      'user has uploaded a file',
      `[path="${request.fullPath}", method="${request.method}", host="${request.host}", ip="${request.ip}", message="user has uploaded a file"]`,
    );

    return this._ok(result);
  }
}
