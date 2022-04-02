import { GetFolderRequestDTO, GetFolderUseCase } from '@iremono/backend-core/dist/use-cases';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class GetFolderController extends Controller<GetFolderUseCase> {
  constructor(useCase: GetFolderUseCase) {
    super(useCase);
  }

  async handle({ user, params, query }: HttpRequest): Promise<HttpResponse> {
    const dto: GetFolderRequestDTO = {
      id: params?.id,
      ownerId: user?.id,
      folderType: (query?.type as 'normal' | 'crypto') || 'normal',
    };

    const result = await this._useCase.handle(dto);

    return this._ok(result);
  }
}
