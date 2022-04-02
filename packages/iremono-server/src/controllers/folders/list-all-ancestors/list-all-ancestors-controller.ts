import { ListAllAncestorsRequestDTO, ListAllAncestorsUseCase } from '@iremono/backend-core/dist/use-cases/folders/';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class ListAllAncestorsController extends Controller<ListAllAncestorsUseCase> {
  constructor(useCase: ListAllAncestorsUseCase) {
    super(useCase);
  }

  async handle({ params, user }: HttpRequest): Promise<HttpResponse> {
    const dto: ListAllAncestorsRequestDTO = {
      id: params?.id,
      ownerId: user?.id,
    };
    const result = await this._useCase.handle(dto);

    return this._ok(result);
  }
}
