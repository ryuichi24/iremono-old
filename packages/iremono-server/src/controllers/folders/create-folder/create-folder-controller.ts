import { CreateFolderRequestDTO, CreateFolderUseCase } from '@iremono/backend-core/dist/use-cases';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class CreateFolderController extends Controller<CreateFolderUseCase> {
  constructor(useCase: CreateFolderUseCase) {
    super(useCase);
  }

  async handle({ body: { name, parentId }, user }: HttpRequest): Promise<HttpResponse> {
    const dto: CreateFolderRequestDTO = {
      name,
      parentId,
      ownerId: user?.id,
    };

    const result = await this._useCase.handle(dto);

    return this._created(result);
  }
}
