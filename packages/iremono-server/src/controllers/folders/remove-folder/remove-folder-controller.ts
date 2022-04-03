import { IRemoveFolderUseCase } from '@iremono/backend-core/dist/use-cases/folders/remove-folder/contracts';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class RemoveFolderController extends Controller<IRemoveFolderUseCase> {
  constructor(useCase: IRemoveFolderUseCase) {
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
