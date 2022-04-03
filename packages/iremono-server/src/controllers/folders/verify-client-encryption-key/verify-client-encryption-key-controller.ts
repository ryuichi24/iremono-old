import { IVerifyClientEncryptionKeyUseCase } from '@iremono/backend-core/dist/use-cases/folders/verify-client-encryption-key/contracts';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class VerifyClientEncryptionKeyController extends Controller<IVerifyClientEncryptionKeyUseCase> {
  constructor(useCase: IVerifyClientEncryptionKeyUseCase) {
    super(useCase);
  }

  async handle({ body: { encryptionKey }, user }: HttpRequest): Promise<HttpResponse> {
    const result = await this._useCase.handle({
      ownerId: user?.id,
      clientEncryptionKey: encryptionKey,
    });

    return this._ok(result);
  }
}
