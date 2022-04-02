import { RestoreFolderRequestDTO, RestoreFolderUseCase } from '@iremono/backend-core/dist/use-cases';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class RestoreFolderController extends Controller<RestoreFolderUseCase> {
  constructor(useCase: RestoreFolderUseCase) {
    super(useCase);
  }

  async handle({ params, user }: HttpRequest): Promise<HttpResponse> {
    const dto: RestoreFolderRequestDTO = {
      id: params?.id,
      ownerId: user?.id,
    };

    await this._useCase.handle(dto);

    return this._noContent();
  }
}
