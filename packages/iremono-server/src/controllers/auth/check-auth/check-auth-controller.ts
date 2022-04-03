import { ICheckAuthUseCase } from '@iremono/backend-core/dist/use-cases/auth/check-auth';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class CheckAuthController extends Controller<ICheckAuthUseCase> {
  constructor(useCase: ICheckAuthUseCase) {
    super(useCase);
  }

  async handle({ user }: HttpRequest): Promise<HttpResponse> {
    const result = await this._useCase.handle({
      id: user?.id,
    });

    return this._ok(result);
  }
}
