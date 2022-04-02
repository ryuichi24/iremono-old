import { UpdateFileRequestDTO, UpdateFileUseCase } from '@iremono/backend-core/dist/use-cases';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class UpdateFileController extends Controller<UpdateFileUseCase> {
  constructor(useCase: UpdateFileUseCase) {
    super(useCase);
  }

  async handle({ body: { name, parentId }, params, user }: HttpRequest): Promise<HttpResponse> {
    const dto: UpdateFileRequestDTO = {
      name,
      parentId,
      ownerId: user?.id,
      id: params?.id,
    };

    const result = await this._useCase.handle(dto);

    return this._ok(result);
  }
}
