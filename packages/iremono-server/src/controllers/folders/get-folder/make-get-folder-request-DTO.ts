import { GetFolderRequestDTO } from '@iremono/backend-core/dist/use-cases/folders';
import { HttpRequest } from '../../../shared/controller-lib';

export const makeGetFolderRequestDTO = ({
  user,
  params: { id },
  query: { type },
}: HttpRequest): GetFolderRequestDTO => ({
  id,
  ownerId: user.id,
  folderType: (type as 'normal' | 'crypto') || 'normal',
});
