import { CreateRootFolderRequestDTO } from '@iremono/backend-core/dist/use-cases';
import { HttpRequest } from '../../../shared/controller-lib';

export const makeCreateRootFolderRequestDTO = ({
  body: { name, encryptionKey },
  query: { type },
  user: { id },
}: HttpRequest): CreateRootFolderRequestDTO => ({
  name,
  ownerId: id,
  folderType: (type as 'normal' | 'crypto') || 'normal',
  clientEncryptionKey: encryptionKey,
});
