import { UpdateFolderRequestDTO, UpdateFolderUseCase } from '@iremono/backend-core/dist/use-cases';
import { Logger, LoggerFactory } from '@iremono/util/dist/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class UpdateFolderController extends Controller<UpdateFolderUseCase> {
  private readonly _logger: Logger;

  constructor(useCase: UpdateFolderUseCase, loggerFactory: LoggerFactory) {
    super(useCase);
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle({ body: { name, parentId }, params, user, fullPath, method, host, ip }: HttpRequest): Promise<HttpResponse> {

    const dto: UpdateFolderRequestDTO = {
      name,
      parentId,
      ownerId: user?.id,
      id: params?.id,
    };

    const result = await this._useCase.handle(dto);

    this._logger.info(
      'user has updated the folder',
      `[path="${fullPath}", method="${method}", host="${host}", ip="${ip}", message="user has updated the folder"]`,
    );

    return this._ok(result);
  }
}
