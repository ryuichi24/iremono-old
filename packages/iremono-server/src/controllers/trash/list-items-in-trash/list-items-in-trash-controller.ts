import { IListItemsInTrashUseCase } from '@iremono/backend-core/dist/use-cases/trash/list-items-in-trash';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class ListItemsInTrashController extends Controller<IListItemsInTrashUseCase> {
  constructor(useCase: IListItemsInTrashUseCase) {
    super(useCase);
  }

  async handle({ query, user }: HttpRequest): Promise<HttpResponse> {
    const result = await this._useCase.handle({
      ownerId: user.id,
      folderType: (query?.type as 'normal' | 'crypto') || 'normal',
    });

    return this._ok(result);
  }
}
