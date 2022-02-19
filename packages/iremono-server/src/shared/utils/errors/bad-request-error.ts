import { HttpStatusCode } from '../http';
import { HttpError } from './base';

export class BadRequestError extends HttpError {
  constructor(message: string, stack?: string) {
    super(message, HttpStatusCode.BAD_REQUEST, stack);
  }
}
