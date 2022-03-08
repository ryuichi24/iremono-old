import { HttpRequest } from '../../../shared/controller-lib';
import { VerifyClientEncryptionKeyRequestDTO } from '@iremono/backend-core/dist/use-cases/folders/verify-client-encryption-key';

export const makeVerifyClientEncryptionKeyRequestDTO = ({
  body: { encryptionKey },
  user,
}: HttpRequest): VerifyClientEncryptionKeyRequestDTO => ({
  ownerId: user.id,
  clientEncryptionKey: encryptionKey,
});
