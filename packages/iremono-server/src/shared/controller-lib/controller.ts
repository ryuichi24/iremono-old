import { Readable } from 'stream';
import { Headers, Cookie, HttpRequest, HttpResponse } from '.';
import { HttpStatusCode } from '../utils/http';

export abstract class Controller<TUseCase = any> {
  protected readonly _useCase: TUseCase;

  constructor(useCase: TUseCase) {
    this._useCase = useCase;
  }

  abstract handle(request: HttpRequest): Promise<HttpResponse>;

  protected _ok(body: any = null, headers: Headers = {}, cookies: Cookie[] = []) {
    return this._makeHttpResponse({ httpStatusCode: HttpStatusCode.OK, body, headers, cookies });
  }

  protected _created(body: any = null, headers: Headers = {}, cookies: Cookie[] = []) {
    return this._makeHttpResponse({ httpStatusCode: HttpStatusCode.CREATED, body, headers, cookies });
  }

  protected _noContent(body: any = null, headers: Headers = {}, cookies: Cookie[] = []) {
    return this._makeHttpResponse({ httpStatusCode: HttpStatusCode.NO_CONTENT, body, headers, cookies });
  }

  protected _download(readableStream: Readable, headers: Headers = {}, cookies: Cookie[] = []) {
    return this._makeHttpResponse({ httpStatusCode: HttpStatusCode.OK, readableStream, headers, cookies });
  }

  private _makeHttpResponse({
    httpStatusCode,
    body = null,
    readableStream = null,
    headers = {},
    cookies = [],
  }: {
    httpStatusCode: HttpStatusCode;
    body?: any;
    readableStream?: Readable | null;
    headers: Headers;
    cookies: Cookie[];
  }): HttpResponse {
    return {
      body,
      statusCode: httpStatusCode,
      headers,
      hasHeaders: Object.keys(headers).length > 0,
      readableStream,
      cookies,
      hasCookies: cookies.length > 0,
    };
  }
}
