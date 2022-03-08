import { VerifyClientEncryptionKeyUseCase } from '@iremono/backend-core/dist/use-cases';
import { Logger, LoggerFactory } from '@iremono/util/dist/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { makeVerifyClientEncryptionKeyRequestDTO } from './make-verify-client-encryption-key-request-DTO';

export class VerifyClientEncryptionKeyController extends Controller<VerifyClientEncryptionKeyUseCase> {
  private readonly _logger: Logger;

  constructor(useCase: VerifyClientEncryptionKeyUseCase, loggerFactory: LoggerFactory) {
    super(useCase);
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const dto = makeVerifyClientEncryptionKeyRequestDTO(request);
    const result = await this._useCase.handle(dto);

    this._logger.info(
      'user has requested for verification of encryption key',
      `[path="${request.fullPath}", method="${request.method}", host="${request.host}", ip="${request.ip}", message="user has requested for verification of encryption key"]`,
    );

    return this._ok(result);
  }
}
