import { Readable } from 'stream';
import { HttpRequest, HttpResponse } from '.';
import { HttpStatusCode } from '../utils/http';

export abstract class Controller<TUseCase = any> {
  protected readonly _useCase: TUseCase;

  constructor(useCase: TUseCase) {
    this._useCase = useCase;
  }

  abstract handle(request: HttpRequest): Promise<HttpResponse>;

  protected _ok(body: any = null, headers = {}) {
    return this._makeHttpResponse({ httpStatusCode: HttpStatusCode.OK, body, headers });
  }

  protected _created(body: any = null, headers = {}) {
    return this._makeHttpResponse({ httpStatusCode: HttpStatusCode.CREATED, body, headers });
  }

  protected _noContent(body: any = null, headers = {}) {
    return this._makeHttpResponse({ httpStatusCode: HttpStatusCode.NO_CONTENT, body, headers });
  }

  protected _download(readableStream: Readable, headers = {}) {
    return this._makeHttpResponse({ httpStatusCode: HttpStatusCode.OK, readableStream, headers });
  }

  private _makeHttpResponse({
    httpStatusCode,
    body = null,
    readableStream = null,
    headers = {},
  }: {
    httpStatusCode: HttpStatusCode;
    body?: any;
    readableStream?: Readable | null;
    headers: {};
  }): HttpResponse {
    return {
      body,
      statusCode: httpStatusCode,
      headers,
      hasHeaders: Object.keys(headers).length > 0,
      readableStream,
    };
  }
}
