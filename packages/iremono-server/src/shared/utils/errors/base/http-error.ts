import { CustomError } from '@iremono/util/dist/errors';
import { HttpStatusCode } from '../../http';

export class HttpError extends CustomError {
  protected statusCode: HttpStatusCode;
  constructor(message: string, statusCode: HttpStatusCode, stack?: string) {
    super(message);
    this.statusCode = statusCode;
    this.stack = stack;
  }

  get StatusCode(): HttpStatusCode {
    return this.statusCode;
  }
}
