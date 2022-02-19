import { HttpStatusCode } from '../http';
import { HttpError } from './base';

export class UnauthorizedError extends HttpError {
  constructor(message: string, stack?: string) {
    super(message, HttpStatusCode.UNAUTHORIZED, stack);
  }
}
