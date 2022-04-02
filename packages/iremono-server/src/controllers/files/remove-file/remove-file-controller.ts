import { RemoveFileRequestDTO, RemoveFileUseCase } from '@iremono/backend-core/dist/use-cases';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class RemoveFileController extends Controller<RemoveFileUseCase> {
  constructor(useCase: RemoveFileUseCase) {
    super(useCase);
  }

  async handle({ params, user }: HttpRequest): Promise<HttpResponse> {
    const dto: RemoveFileRequestDTO = {
      id: params?.id,
      ownerId: user?.id,
    };

    await this._useCase.handle(dto);

    return this._noContent();
  }
}
