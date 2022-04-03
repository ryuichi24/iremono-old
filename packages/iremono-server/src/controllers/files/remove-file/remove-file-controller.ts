import { IRemoveFileUseCase } from '@iremono/backend-core/dist/use-cases/files/remove-file/contracts';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class RemoveFileController extends Controller<IRemoveFileUseCase> {
  constructor(useCase: IRemoveFileUseCase) {
    super(useCase);
  }

  async handle({ params, user }: HttpRequest): Promise<HttpResponse> {
    await this._useCase.handle({
      id: params?.id,
      ownerId: user?.id,
    });

    return this._noContent();
  }
}
