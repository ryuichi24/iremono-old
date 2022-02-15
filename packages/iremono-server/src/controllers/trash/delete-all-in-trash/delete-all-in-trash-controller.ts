import { DeleteAllInTrashUseCase } from '@iremono/backend-core/dist/use-cases';
import { Logger, LoggerFactory } from '@iremono/util/dist/logger';
import { deleteFromFileSystem } from '@iremono/util/dist/file-system';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { makeDeleteAllInTrashRequestDTO } from './make-delete-all-in-trash-request-DTO';

export class DeleteAllInTrashController extends Controller<DeleteAllInTrashUseCase> {
  private readonly _logger: Logger;

  constructor(useCase: DeleteAllInTrashUseCase, loggerFactory: LoggerFactory) {
    super(useCase);
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const dto = makeDeleteAllInTrashRequestDTO(request);
    const result = await this._useCase.handle(dto);

    await Promise.all(result.deletedFiles.map((file) => deleteFromFileSystem(file.filePath!)));

    this._logger.info(
      'user has deleted all in trash',
      `[path="${request.fullPath}", method="${request.method}", host="${request.host}", ip="${request.ip}", message="user has deleted all in trash"]`,
    );

    return this._noContent();
  }
}
