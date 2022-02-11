import { UploadFileRequestDTO } from '@iremono/backend-core/src/use-cases/files/upload-file';
import { HttpRequest } from '../../../shared/controller-lib';

export const makeUploadFileRequestDTO = ({
  user,
  uploadedFile: {
    fileName,
    filePath,
    mimeType,
    formData: { parentId, fileSize },
  },
}: HttpRequest): UploadFileRequestDTO => ({
  name: fileName,
  parentId,
  filePath,
  fileSize,
  mimeType,
  ownerId: user.id,
});
