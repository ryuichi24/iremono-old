import { GetFileTokenRequestDTO, GetFileTokenUseCase } from '@iremono/backend-core/dist/use-cases';
import { Logger, LoggerFactory } from '@iremono/util/dist/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class GetFileTokenController extends Controller<GetFileTokenUseCase> {
  private readonly _logger: Logger;

  constructor(useCase: GetFileTokenUseCase, loggerFactory: LoggerFactory) {
    super(useCase);
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle({ params, query, user, fullPath, method, host, ip }: HttpRequest): Promise<HttpResponse> {
    const dto: GetFileTokenRequestDTO = {
      ownerId: user?.id,
      id: params?.id,
      tokenType: query?.type,
    };

    const result = await this._useCase.handle(dto);

    this._logger.info(
      'user has requested for file token',
      `[path="${fullPath}", method="${method}", host="${host}", ip="${ip}", message="user has requested for file token"]`,
    );

    return this._ok(result);
  }
}
