import { IUpdateFolderUseCase } from '@iremono/backend-core/dist/use-cases/folders/update-folder/contracts';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class UpdateFolderController extends Controller<IUpdateFolderUseCase> {
  constructor(useCase: IUpdateFolderUseCase) {
    super(useCase);
  }

  async handle({ body: { name, parentId }, params, user }: HttpRequest): Promise<HttpResponse> {
    const result = await this._useCase.handle({
      name,
      parentId,
      ownerId: user?.id,
      id: params?.id,
    });

    return this._ok(result);
  }
}
