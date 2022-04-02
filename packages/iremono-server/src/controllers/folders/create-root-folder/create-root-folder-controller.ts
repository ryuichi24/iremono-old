import { CreateRootFolderRequestDTO, CreateRootFolderUseCase } from '@iremono/backend-core/dist/use-cases';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class CreateRootFolderController extends Controller<CreateRootFolderUseCase> {
  constructor(useCase: CreateRootFolderUseCase) {
    super(useCase);
  }

  async handle({ body: { name, encryptionKey }, query, user }: HttpRequest): Promise<HttpResponse> {
    const dto: CreateRootFolderRequestDTO = {
      name,
      ownerId: user?.id,
      folderType: (query?.type as 'normal' | 'crypto') || 'normal',
      clientEncryptionKey: encryptionKey,
    };

    const result = await this._useCase.handle(dto);

    return this._created(result);
  }
}
