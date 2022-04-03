import { IListAllAncestorsUseCase } from '@iremono/backend-core/dist/use-cases/folders/list-all-ancestors/contracts';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class ListAllAncestorsController extends Controller<IListAllAncestorsUseCase> {
  constructor(useCase: IListAllAncestorsUseCase) {
    super(useCase);
  }

  async handle({ params, user }: HttpRequest): Promise<HttpResponse> {
    const result = await this._useCase.handle({
      id: params?.id,
      ownerId: user?.id,
    });

    return this._ok(result);
  }
}
