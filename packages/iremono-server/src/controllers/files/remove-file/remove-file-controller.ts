import { RemoveFileRequestDTO, RemoveFileUseCase } from '@iremono/backend-core/dist/use-cases';
import { Logger, LoggerFactory } from '@iremono/util/dist/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class RemoveFileController extends Controller<RemoveFileUseCase> {
  private readonly _logger: Logger;

  constructor(useCase: RemoveFileUseCase, loggerFactory: LoggerFactory) {
    super(useCase);
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle({ params, user, fullPath, method, host, ip }: HttpRequest): Promise<HttpResponse> {
    const dto: RemoveFileRequestDTO = {
      id: params?.id,
      ownerId: user?.id,
    };

    await this._useCase.handle(dto);

    this._logger.info(
      'user has removed a file',
      `[path="${fullPath}", method="${method}", host="${host}", ip="${ip}", message="user has removed a file"]`,
    );

    return this._noContent();
  }
}
