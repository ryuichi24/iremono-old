import { UpdateFileRequestDTO, UpdateFileUseCase } from '@iremono/backend-core/dist/use-cases';
import { Logger, LoggerFactory } from '@iremono/util/dist/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class UpdateFileController extends Controller<UpdateFileUseCase> {
  private readonly _logger: Logger;

  constructor(useCase: UpdateFileUseCase, loggerFactory: LoggerFactory) {
    super(useCase);
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle({ body: { name, parentId }, params, user, fullPath, method, host, ip }: HttpRequest): Promise<HttpResponse> {
    const dto: UpdateFileRequestDTO = {
      name,
      parentId,
      ownerId: user?.id,
      id: params?.id,
    };

    const result = await this._useCase.handle(dto);

    this._logger.info(
      'user has updated the file',
      `[path="${fullPath}", method="${method}", host="${host}", ip="${ip}", message="user has updated the file"]`,
    );

    return this._ok(result);
  }
}
