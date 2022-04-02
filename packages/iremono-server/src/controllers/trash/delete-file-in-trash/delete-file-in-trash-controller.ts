import path from 'path';
import { DeleteFileInTrashRequestDTO, DeleteFileInTrashUseCase } from '@iremono/backend-core/dist/use-cases';
import { deleteFromFileSystem } from '@iremono/util/dist/file-system';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { config } from '../../../config';

export class DeleteFileInTrashController extends Controller<DeleteFileInTrashUseCase> {
  constructor(useCase: DeleteFileInTrashUseCase) {
    super(useCase);
  }

  async handle({ params, user }: HttpRequest): Promise<HttpResponse> {
    const dto: DeleteFileInTrashRequestDTO = {
      id: params?.id,
      ownerId: user?.id,
    };

    const result = await this._useCase.handle(dto);

    await deleteFromFileSystem(path.join(config.mediaConfig.PATH_TO_MEDIA_DIR, result.deletedFile.filePath!));

    if (result.deletedFile.hasThumbnail)
      await deleteFromFileSystem(path.join(config.mediaConfig.PATH_TO_MEDIA_DIR, result.deletedFile.thumbnailPath!));

    return this._noContent();
  }
}
