import {
  VerifyClientEncryptionKeyRequestDTO,
  VerifyClientEncryptionKeyUseCase,
} from '@iremono/backend-core/dist/use-cases';
import { Logger, LoggerFactory } from '@iremono/util/dist/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class VerifyClientEncryptionKeyController extends Controller<VerifyClientEncryptionKeyUseCase> {
  private readonly _logger: Logger;

  constructor(useCase: VerifyClientEncryptionKeyUseCase, loggerFactory: LoggerFactory) {
    super(useCase);
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle({ body: { encryptionKey }, user, fullPath, method, host, ip }: HttpRequest): Promise<HttpResponse> {
    const dto: VerifyClientEncryptionKeyRequestDTO = {
      ownerId: user?.id,
      clientEncryptionKey: encryptionKey,
    };

    const result = await this._useCase.handle(dto);

    this._logger.info(
      'user has requested for verification of encryption key',
      `[path="${fullPath}", method="${method}", host="${host}", ip="${ip}", message="user has requested for verification of encryption key"]`,
    );

    return this._ok(result);
  }
}
