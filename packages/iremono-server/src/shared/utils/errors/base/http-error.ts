import { CustomError } from '@iremono/util/src/errors';
import { HttpStatusCode } from '../../http';

export class HttpError extends CustomError {
  protected statusCode: HttpStatusCode;
  constructor(message: string, statusCode: HttpStatusCode) {
    super(message);
    this.statusCode = statusCode;
  }

  get StatusCode(): HttpStatusCode {
    return this.statusCode;
  }
}
