import { DeleteFolderInTrashUseCase } from '@iremono/backend-core/src/use-cases';
import { Logger, LoggerFactory } from '@iremono/util/src/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { makeDeleteFolderInTrashRequestDTO } from './make-delete-folder-in-trash-request-DTO';

export class DeleteFolderInTrashController extends Controller<DeleteFolderInTrashUseCase> {
  private readonly _logger: Logger;

  constructor(useCase: DeleteFolderInTrashUseCase, loggerFactory: LoggerFactory) {
    super(useCase);
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const dto = makeDeleteFolderInTrashRequestDTO(request);
    // TODO: delete files from file system
    const result = await this._useCase.handle(dto);

    this._logger.info(
      'user has deleted a folder in trash',
      `[path="${request.fullPath}", method="${request.method}", host="${request.host}", ip="${request.ip}", message="user has deleted a folder in trash"]`,
    );

    return this._noContent();
  }
}
