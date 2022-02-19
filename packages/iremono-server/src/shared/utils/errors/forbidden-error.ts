import { HttpStatusCode } from '../http';
import { HttpError } from './base';

export class ForbiddenError extends HttpError {
  constructor(message: string, stack?: string) {
    super(message, HttpStatusCode.FORBIDDEN, stack);
  }
}
