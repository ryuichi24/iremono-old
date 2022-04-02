import { CheckAuthRequestDTO, CheckAuthUseCase } from '@iremono/backend-core/src/use-cases';
import { Logger, LoggerFactory } from '@iremono/util/dist/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class CheckAuthController extends Controller<CheckAuthUseCase> {
  private readonly _logger: Logger;

  constructor(useCase: CheckAuthUseCase, loggerFactory: LoggerFactory) {
    super(useCase);
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle({ user, fullPath, method, host, ip }: HttpRequest): Promise<HttpResponse> {
    const dto: CheckAuthRequestDTO = {
      id: user?.id,
    };

    const result = await this._useCase.handle(dto);

    this._logger.info(
      'user has checked his/her auth',
      `[path="${fullPath}", method="${method}", host="${host}", ip="${ip}", message="user has checked his/her auth"]`,
    );

    return this._ok(result);
  }
}
