import { ListItemsInTrashUseCase } from '@iremono/backend-core/dist/use-cases';
import { Logger, LoggerFactory } from '@iremono/util/dist/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { makeListItemsInTrashRequestDTO } from './make-list-items-in-trash-request-DTO';

export class ListItemsInTrashController extends Controller<ListItemsInTrashUseCase> {
  private readonly _logger: Logger;

  constructor(useCase: ListItemsInTrashUseCase, loggerFactory: LoggerFactory) {
    super(useCase);
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const dto = makeListItemsInTrashRequestDTO(request);
    const result = await this._useCase.handle(dto);

    this._logger.info(
      'user has requested for items in trash',
      `[path="${request.fullPath}", method="${request.method}", host="${request.host}", ip="${request.ip}", message="user has requested for items in trash"]`,
    );

    return this._ok(result);
  }
}
