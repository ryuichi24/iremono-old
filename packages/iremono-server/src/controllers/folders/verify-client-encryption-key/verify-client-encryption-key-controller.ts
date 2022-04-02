import {
  VerifyClientEncryptionKeyRequestDTO,
  VerifyClientEncryptionKeyUseCase,
} from '@iremono/backend-core/dist/use-cases';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class VerifyClientEncryptionKeyController extends Controller<VerifyClientEncryptionKeyUseCase> {
  constructor(useCase: VerifyClientEncryptionKeyUseCase) {
    super(useCase);
  }

  async handle({ body: { encryptionKey }, user }: HttpRequest): Promise<HttpResponse> {
    const dto: VerifyClientEncryptionKeyRequestDTO = {
      ownerId: user?.id,
      clientEncryptionKey: encryptionKey,
    };

    const result = await this._useCase.handle(dto);

    return this._ok(result);
  }
}
