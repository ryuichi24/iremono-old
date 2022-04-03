import { ICreateFolderUseCase } from '@iremono/backend-core/dist/use-cases/folders/create-folder/contracts';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class CreateFolderController extends Controller<ICreateFolderUseCase> {
  constructor(useCase: ICreateFolderUseCase) {
    super(useCase);
  }

  async handle({ body: { name, parentId }, user }: HttpRequest): Promise<HttpResponse> {
    const result = await this._useCase.handle({
      name,
      parentId,
      ownerId: user?.id,
    });

    return this._created(result);
  }
}
