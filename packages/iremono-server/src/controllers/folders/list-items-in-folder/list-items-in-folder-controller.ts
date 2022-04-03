import { IListItemsInFolderUseCase } from '@iremono/backend-core/dist/use-cases/folders/list-items-in-folder/contracts';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class ListItemsInFolderController extends Controller<IListItemsInFolderUseCase> {
  constructor(useCase: IListItemsInFolderUseCase) {
    super(useCase);
  }

  async handle({ params, user }: HttpRequest): Promise<HttpResponse> {
    const result = await this._useCase.handle({
      parentId: params?.id,
      ownerId: user?.id,
    });

    return this._ok(result);
  }
}
