import { ICreateRootFolderUseCase } from '@iremono/backend-core/dist/use-cases/folders/create-root-folder/contracts';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class CreateRootFolderController extends Controller<ICreateRootFolderUseCase> {
  constructor(useCase: ICreateRootFolderUseCase) {
    super(useCase);
  }

  async handle({ body: { name, encryptionKey }, query, user }: HttpRequest): Promise<HttpResponse> {
    const result = await this._useCase.handle({
      name,
      ownerId: user?.id,
      folderType: (query?.type as 'normal' | 'crypto') || 'normal',
      clientEncryptionKey: encryptionKey,
    });

    return this._created(result);
  }
}
