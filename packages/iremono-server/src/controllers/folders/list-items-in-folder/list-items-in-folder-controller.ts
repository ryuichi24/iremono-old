import { ListItemsInFolderRequestDTO, ListItemsInFolderUseCase } from '@iremono/backend-core/dist/use-cases';
import { Logger, LoggerFactory } from '@iremono/util/dist/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class ListItemsInFolderController extends Controller<ListItemsInFolderUseCase> {
  private readonly _logger: Logger;

  constructor(useCase: ListItemsInFolderUseCase, loggerFactory: LoggerFactory) {
    super(useCase);
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle({ params, user, fullPath, method, host, ip }: HttpRequest): Promise<HttpResponse> {
    const dto: ListItemsInFolderRequestDTO = {
      parentId: params?.id,
      ownerId: user?.id,
    };

    const result = await this._useCase.handle(dto);

    this._logger.info(
      'user has requested for items in folder',
      `[path="${fullPath}", method="${method}", host="${host}", ip="${ip}", message="user has requested for items in folder"]`,
    );

    return this._ok(result);
  }
}
