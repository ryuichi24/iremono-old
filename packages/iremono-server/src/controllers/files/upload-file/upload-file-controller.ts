import { IUploadFileUseCase } from '@iremono/backend-core/dist/use-cases/files/upload-file/contracts';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class UploadFileController extends Controller<IUploadFileUseCase> {
  constructor(useCase: IUploadFileUseCase) {
    super(useCase);
  }

  async handle({
    uploadedFile: {
      fileName,
      filePath,
      fileSize,
      mimeType,
      fileInitializationVector,
      formData: { parentId },
      thumbnail: { thumbnailPath, thumbnailSize, thumbnailInitializationVector },
      isCryptoFolderItem,
    },
    user,
  }: HttpRequest): Promise<HttpResponse> {
    const result = await this._useCase.handle({
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
      isCryptoFolderItem,
    });

    return this._created(result);
  }
}
``;
