import { ListAllAncestorsRequestDTO, ListAllAncestorsUseCase } from '@iremono/backend-core/dist/use-cases/folders/';
import { Logger, LoggerFactory } from '@iremono/util/dist/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class ListAllAncestorsController extends Controller<ListAllAncestorsUseCase> {
  private readonly _logger: Logger;

  constructor(useCase: ListAllAncestorsUseCase, loggerFactory: LoggerFactory) {
    super(useCase);
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle({ params, user, fullPath, method, host, ip }: HttpRequest): Promise<HttpResponse> {
    const dto: ListAllAncestorsRequestDTO = {
      id: params?.id,
      ownerId: user?.id,
    };
    const result = await this._useCase.handle(dto);

    this._logger.info(
      `user has requested for folder's ancestors`,
      `[path="${fullPath}", method="${method}", host="${host}", ip="${ip}", message="user has requested for folder's ancestors"]`,
    );

    return this._ok(result);
  }
}
