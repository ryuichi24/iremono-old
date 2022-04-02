import { ListItemsInFolderRequestDTO, ListItemsInFolderUseCase } from '@iremono/backend-core/dist/use-cases';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class ListItemsInFolderController extends Controller<ListItemsInFolderUseCase> {
  constructor(useCase: ListItemsInFolderUseCase) {
    super(useCase);
  }

  async handle({ params, user }: HttpRequest): Promise<HttpResponse> {
    const dto: ListItemsInFolderRequestDTO = {
      parentId: params?.id,
      ownerId: user?.id,
    };

    const result = await this._useCase.handle(dto);

    return this._ok(result);
  }
}
