import { UploadFileRequestDTO, UploadFileUseCase } from '@iremono/backend-core/dist/use-cases';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class UploadFileController extends Controller<UploadFileUseCase> {
  constructor(useCase: UploadFileUseCase) {
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
    const dto: UploadFileRequestDTO = {
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
    };

    const result = await this._useCase.handle(dto);

    return this._created(result);
  }
}
``;
