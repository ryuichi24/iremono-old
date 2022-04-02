import { ListItemsInTrashRequestDTO, ListItemsInTrashUseCase } from '@iremono/backend-core/dist/use-cases';
import { Logger, LoggerFactory } from '@iremono/util/dist/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class ListItemsInTrashController extends Controller<ListItemsInTrashUseCase> {
  private readonly _logger: Logger;

  constructor(useCase: ListItemsInTrashUseCase, loggerFactory: LoggerFactory) {
    super(useCase);
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle({ query, user, fullPath, method, host, ip }: HttpRequest): Promise<HttpResponse> {
    const dto: ListItemsInTrashRequestDTO = {
      ownerId: user.id,
      folderType: (query?.type as 'normal' | 'crypto') || 'normal',
    };

    const result = await this._useCase.handle(dto);

    this._logger.info(
      'user has requested for items in trash',
      `[path="${fullPath}", method="${method}", host="${host}", ip="${ip}", message="user has requested for items in trash"]`,
    );

    return this._ok(result);
  }
}
