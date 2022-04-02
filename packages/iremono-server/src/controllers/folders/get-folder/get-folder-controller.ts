import { GetFolderRequestDTO, GetFolderUseCase } from '@iremono/backend-core/dist/use-cases';
import { Logger, LoggerFactory } from '@iremono/util/dist/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class GetFolderController extends Controller<GetFolderUseCase> {
  private readonly _logger: Logger;

  constructor(useCase: GetFolderUseCase, loggerFactory: LoggerFactory) {
    super(useCase);
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle({ user, params, query, fullPath, method, host, ip }: HttpRequest): Promise<HttpResponse> {
    const dto: GetFolderRequestDTO = {
      id: params?.id,
      ownerId: user?.id,
      folderType: (query?.type as 'normal' | 'crypto') || 'normal',
    };

    const result = await this._useCase.handle(dto);

    this._logger.info(
      'user has requested for folder',
      `[path="${fullPath}", method="${method}", host="${host}", ip="${ip}", message="user has requested for folder"]`,
    );

    return this._ok(result);
  }
}
