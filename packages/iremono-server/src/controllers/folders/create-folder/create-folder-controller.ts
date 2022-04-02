import { CreateFolderRequestDTO, CreateFolderUseCase } from '@iremono/backend-core/dist/use-cases';
import { Logger, LoggerFactory } from '@iremono/util/dist/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class CreateFolderController extends Controller<CreateFolderUseCase> {
  private readonly _logger: Logger;

  constructor(useCase: CreateFolderUseCase, loggerFactory: LoggerFactory) {
    super(useCase);
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle({ body: { name, parentId }, user, fullPath, method, host, ip }: HttpRequest): Promise<HttpResponse> {
    const dto: CreateFolderRequestDTO = {
      name,
      parentId,
      ownerId: user?.id,
    };

    const result = await this._useCase.handle(dto);

    this._logger.info(
      'user has created a new folder',
      `[path="${fullPath}", method="${method}", host="${host}", ip="${ip}", message="user has created a new folder"]`,
    );

    return this._created(result);
  }
}
