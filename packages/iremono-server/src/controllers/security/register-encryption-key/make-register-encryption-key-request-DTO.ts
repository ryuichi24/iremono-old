import { RegisterEncryptionKeyRequestDTO } from '@iremono/backend-core/dist/use-cases';
import { HttpRequest } from '../../../shared/controller-lib';

export const makeRegisterEncryptionKeyRequestDTO = ({
  body: { encryptionKey },
  user,
}: HttpRequest): RegisterEncryptionKeyRequestDTO => ({
  userId: user.id,
  encryptionKey,
});
