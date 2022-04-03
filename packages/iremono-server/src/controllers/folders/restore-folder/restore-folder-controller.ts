import { IRestoreFolderUseCase } from '@iremono/backend-core/dist/use-cases/folders/restore-folder/contracts';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class RestoreFolderController extends Controller<IRestoreFolderUseCase> {
  constructor(useCase: IRestoreFolderUseCase) {
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
