import { IGetFolderUseCase } from '@iremono/backend-core/dist/use-cases/folders/get-folder/contracts';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class GetFolderController extends Controller<IGetFolderUseCase> {
  constructor(useCase: IGetFolderUseCase) {
    super(useCase);
  }

  async handle({ user, params, query }: HttpRequest): Promise<HttpResponse> {
    const result = await this._useCase.handle({
      id: params?.id,
      ownerId: user?.id,
      folderType: (query?.type as 'normal' | 'crypto') || 'normal',
    });

    return this._ok(result);
  }
}
