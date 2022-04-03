import { IRestoreFileUseCase } from '@iremono/backend-core/dist/use-cases/files/restore-file/contracts';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class RestoreFileController extends Controller<IRestoreFileUseCase> {
  constructor(useCase: IRestoreFileUseCase) {
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
