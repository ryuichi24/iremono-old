import { SignUpUseCase } from '@iremono/backend-core/dist/use-cases/auth';
import { LoggerFactory, Logger } from '@iremono/util/dist/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { makeSignUpRequestDTO } from './make-sign-up-request-DTO';

export class SignUpController extends Controller<SignUpUseCase> {
  private readonly _logger: Logger;

  constructor(useCase: SignUpUseCase, loggerFactory: LoggerFactory) {
    super(useCase);
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const dto = makeSignUpRequestDTO(request);
    const result = await this._useCase.handle(dto);

    this._logger.info(
      'new user has signed up',
      `[path="${request.fullPath}", method="${request.method}", host="${request.host}", ip="${request.ip}", message="new user has signed up"]`,
    );

    return this._created(result);
  }
}
