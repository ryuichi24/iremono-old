import { RegisterEncryptionKeyUseCase } from '@iremono/backend-core/dist/use-cases';
import { Logger, LoggerFactory } from '@iremono/util/dist/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { makeRegisterEncryptionKeyRequestDTO } from './make-register-encryption-key-request-DTO';

export class RegisterEncryptionKeyController extends Controller<RegisterEncryptionKeyUseCase> {
  private readonly _logger: Logger;

  constructor(useCase: RegisterEncryptionKeyUseCase, loggerFactory: LoggerFactory) {
    super(useCase);
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const dto = makeRegisterEncryptionKeyRequestDTO(request);
    const result = await this._useCase.handle(dto);

    this._logger.info(
      'user has registered an encryption key',
      `[path="${request.fullPath}", method="${request.method}", host="${request.host}", ip="${request.ip}", message="user has registered an encryption key"]`,
    );

    return this._ok(result);
  }
}
