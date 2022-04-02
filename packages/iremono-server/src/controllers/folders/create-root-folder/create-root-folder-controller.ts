import { CreateRootFolderRequestDTO, CreateRootFolderUseCase } from '@iremono/backend-core/dist/use-cases';
import { Logger, LoggerFactory } from '@iremono/util/dist/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class CreateRootFolderController extends Controller<CreateRootFolderUseCase> {
  private readonly _logger: Logger;

  constructor(useCase: CreateRootFolderUseCase, loggerFactory: LoggerFactory) {
    super(useCase);
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle({ body: { name, encryptionKey }, query, user, fullPath, method, host, ip }: HttpRequest): Promise<HttpResponse> {
    const dto: CreateRootFolderRequestDTO = {
      name,
      ownerId: user?.id,
      folderType: (query?.type as 'normal' | 'crypto') || 'normal',
      clientEncryptionKey: encryptionKey,
    };

    const result = await this._useCase.handle(dto);

    this._logger.info(
      'user has created a new root folder',
      `[path="${fullPath}", method="${method}", host="${host}", ip="${ip}", message="user has created a new root folder"]`,
    );

    return this._created(result);
  }
}
