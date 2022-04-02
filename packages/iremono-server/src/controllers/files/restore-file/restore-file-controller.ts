import { RestoreFileRequestDTO, RestoreFileUseCase } from '@iremono/backend-core/dist/use-cases';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class RestoreFileController extends Controller<RestoreFileUseCase> {
  constructor(useCase: RestoreFileUseCase) {
    super(useCase);
  }

  async handle({ params, user }: HttpRequest): Promise<HttpResponse> {
    const dto: RestoreFileRequestDTO = {
      id: params?.id,
      ownerId: user?.id,
    };

    await this._useCase.handle(dto);

    return this._noContent();
  }
}
