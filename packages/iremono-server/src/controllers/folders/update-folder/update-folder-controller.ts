import { UpdateFolderRequestDTO, UpdateFolderUseCase } from '@iremono/backend-core/dist/use-cases';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class UpdateFolderController extends Controller<UpdateFolderUseCase> {
  constructor(useCase: UpdateFolderUseCase) {
    super(useCase);
  }

  async handle({ body: { name, parentId }, params, user }: HttpRequest): Promise<HttpResponse> {
    const dto: UpdateFolderRequestDTO = {
      name,
      parentId,
      ownerId: user?.id,
      id: params?.id,
    };

    const result = await this._useCase.handle(dto);

    return this._ok(result);
  }
}
