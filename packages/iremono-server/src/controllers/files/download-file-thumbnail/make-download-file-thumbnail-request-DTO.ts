import { DownloadFileThumbnailRequestDTO } from '@iremono/backend-core/dist/use-cases/files/download-file-thumbnail';
import { HttpRequest } from '../../../shared/controller-lib';

export const makeDownloadFileThumbnailRequestDTO = ({
  headers: { encryptionKey },
  user,
  params: { id },
}: HttpRequest): DownloadFileThumbnailRequestDTO => ({
  ownerId: user.id,
  id,
  clientEncryptionKey: encryptionKey,
});
