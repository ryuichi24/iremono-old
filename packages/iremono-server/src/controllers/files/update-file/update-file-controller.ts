import { IUpdateFileUseCase } from '@iremono/backend-core/dist/use-cases/files/update-file/contracts';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class UpdateFileController extends Controller<IUpdateFileUseCase> {
  constructor(useCase: IUpdateFileUseCase) {
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
