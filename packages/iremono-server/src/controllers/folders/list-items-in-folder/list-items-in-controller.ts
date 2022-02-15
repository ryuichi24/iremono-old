import { ListItemsInFolderUseCase } from '@iremono/backend-core/dist/use-cases';
import { Logger, LoggerFactory } from '@iremono/util/dist/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { makeListItemsInFolderRequestDTO } from './make-list-items-in-controller-request-DTO';

export class ListItemsInFolderController extends Controller<ListItemsInFolderUseCase> {
  private readonly _logger: Logger;
  
  constructor(useCase: ListItemsInFolderUseCase, loggerFactory: LoggerFactory) {
    super(useCase);
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const dto = makeListItemsInFolderRequestDTO(request);
    const result = await this._useCase.handle(dto);

    this._logger.info(
      'user has requested for items in folder',
      `[path="${request.fullPath}", method="${request.method}", host="${request.host}", ip="${request.ip}", message="user has requested for items in folder"]`,
    );

    return this._ok(result);
  }
}
