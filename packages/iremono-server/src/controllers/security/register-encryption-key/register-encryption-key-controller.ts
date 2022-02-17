import { RegisterEncryptionKeyRequestDTO, RegisterEncryptionKeyUseCase } from '@iremono/backend-core/dist/use-cases';
import { CryptoService } from '@iremono/backend-core/src/services/crypto-service';
import { Logger, LoggerFactory } from '@iremono/util/dist/logger';
import { config } from '../../../config';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class RegisterEncryptionKeyController extends Controller<RegisterEncryptionKeyUseCase> {
  private readonly _logger: Logger;
  private readonly _cryptoService: CryptoService;

  constructor(useCase: RegisterEncryptionKeyUseCase, cryptoService: CryptoService, loggerFactory: LoggerFactory) {
    super(useCase);
    this._cryptoService = cryptoService;
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const encryptionKeyInitializationVector = this._cryptoService.generateInitializeVector();
    const encryptedClientEncryptionKey = this._cryptoService.encryptInCBC(
      request.body.encryptionKey,
      config.mediaConfig.ENCRYPTION_KEY_FOR_CLIENT_ENCRYPTION_KEY,
      encryptionKeyInitializationVector,
    );

    const dto: RegisterEncryptionKeyRequestDTO = {
      encryptionKeyInitializationVector,
      userId: request.user.id,
    };

    await this._useCase.handle(dto);

    this._logger.info(
      'user has registered an encryption key',
      `[path="${request.fullPath}", method="${request.method}", host="${request.host}", ip="${request.ip}", message="user has registered an encryption key"]`,
    );

    return this._ok({ encryptedClientEncryptionKey });
  }
}
