import { SignInUseCase } from '@iremono/backend-core/src/use-cases/identity/sign-in';
import { Logger, LoggerFactory } from '@iremono/util/src/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { makeSignInRequestDTO } from './make-sign-in-request-DTO';

export class SignInController extends Controller<SignInUseCase> {
  private readonly _logger: Logger;
  
  constructor(useCase: SignInUseCase, loggerFactory: LoggerFactory) {
    super(useCase);
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const dto = makeSignInRequestDTO(request);
    const result = await this._useCase.handle(dto);

    this._logger.info(
      'user has signed in',
      `[path="${request.fullPath}", method="${request.method}", host="${request.host}", ip="${request.ip}", message="user has signed in"]`,
    );

    return this._ok(result);
  }
}
