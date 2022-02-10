import { HttpStatusCode } from '../http';
import { HttpError } from './base';

export class NotFoundError extends HttpError {
  constructor(message: string) {
    super(message, HttpStatusCode.NOT_FOUND);
  }
}
