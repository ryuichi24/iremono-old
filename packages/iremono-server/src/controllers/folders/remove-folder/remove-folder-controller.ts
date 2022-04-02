import { RemoveFolderRequestDTO, RemoveFolderUseCase } from '@iremono/backend-core/dist/use-cases';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class RemoveFolderController extends Controller<RemoveFolderUseCase> {
  constructor(useCase: RemoveFolderUseCase) {
    super(useCase);
  }

  async handle({ params, user }: HttpRequest): Promise<HttpResponse> {
    const dto: RemoveFolderRequestDTO = {
      id: params?.id,
      ownerId: user?.id,
    };

    await this._useCase.handle(dto);

    return this._noContent();
  }
}
