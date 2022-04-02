import { ListItemsInTrashRequestDTO, ListItemsInTrashUseCase } from '@iremono/backend-core/dist/use-cases';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class ListItemsInTrashController extends Controller<ListItemsInTrashUseCase> {
  constructor(useCase: ListItemsInTrashUseCase) {
    super(useCase);
  }

  async handle({ query, user }: HttpRequest): Promise<HttpResponse> {
    const dto: ListItemsInTrashRequestDTO = {
      ownerId: user.id,
      folderType: (query?.type as 'normal' | 'crypto') || 'normal',
    };

    const result = await this._useCase.handle(dto);

    return this._ok(result);
  }
}
