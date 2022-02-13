import { UploadFileRequestDTO } from '@iremono/backend-core/src/use-cases/files/upload-file';
import { HttpRequest } from '../../../shared/controller-lib';

export const makeUploadFileRequestDTO = ({
  user,
  uploadedFile: {
    fileName,
    filePath,
    mimeType,
    fileInitializationVector,
    formData: { parentId, fileSize },
    thumbnail: { thumbnailPath, thumbnailSize, thumbnailInitializationVector },
  },
}: HttpRequest): UploadFileRequestDTO => ({
  name: fileName,
  parentId,
  filePath,
  fileSize,
  mimeType,
  fileInitializationVector,
  ownerId: user.id,
  thumbnailPath,
  thumbnailSize,
  thumbnailInitializationVector,
});
