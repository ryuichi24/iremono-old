import { CheckAuthRequestDTO, CheckAuthUseCase } from '@iremono/backend-core/src/use-cases';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class CheckAuthController extends Controller<CheckAuthUseCase> {
  constructor(useCase: CheckAuthUseCase) {
    super(useCase);
  }

  async handle({ user }: HttpRequest): Promise<HttpResponse> {
    const dto: CheckAuthRequestDTO = {
      id: user?.id,
    };

    const result = await this._useCase.handle(dto);

    return this._ok(result);
  }
}
