import { ListAllAncestorsUseCase } from '@iremono/backend-core/dist/use-cases/folders/';
import { Logger, LoggerFactory } from '@iremono/util/dist/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { makeListAllAncestorsRequestDTO } from './make-list-all-ancestors-request-DTO';

export class ListAllAncestorsController extends Controller<ListAllAncestorsUseCase> {
  private readonly _logger: Logger;

  constructor(useCase: ListAllAncestorsUseCase, loggerFactory: LoggerFactory) {
    super(useCase);
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const dto = makeListAllAncestorsRequestDTO(request);
    const result = await this._useCase.handle(dto);

    this._logger.info(
      `user has requested for folder's ancestors`,
      `[path="${request.fullPath}", method="${request.method}", host="${request.host}", ip="${request.ip}", message="user has requested for folder's ancestors"]`,
    );

    return this._ok(result);
  }
}
