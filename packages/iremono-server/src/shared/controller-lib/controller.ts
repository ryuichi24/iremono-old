import { UseCase } from '@iremono/backend-core/src/shared/use-case-lib';
import { HttpRequest, HttpResponse } from '.';
import { HttpStatusCode } from '../utils/http';

export abstract class Controller<TUseCase = any> {
  protected readonly _useCase: TUseCase;

  constructor(useCase: TUseCase) {
    this._useCase = useCase;
  }

  abstract handle(request: HttpRequest): Promise<HttpResponse>;

  protected _ok(body: any = null) {
    return {
      body,
      statusCode: HttpStatusCode.OK,
    };
  }

  protected _created(body: any = null) {
    return {
      body,
      statusCode: HttpStatusCode.CREATED,
    };
  }

  protected _noContent(body: any = null) {
    return {
      body: null,
      statusCode: HttpStatusCode.NO_CONTENT,
    };
  }
}
