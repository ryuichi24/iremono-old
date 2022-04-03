import path from 'path';
import { IDeleteFileInTrashUseCase } from '@iremono/backend-core/dist/use-cases/trash/delete-file-in-trash';
import { deleteFromFileSystem } from '@iremono/util/dist/file-system';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { config } from '../../../config';

export class DeleteFileInTrashController extends Controller<IDeleteFileInTrashUseCase> {
  constructor(useCase: IDeleteFileInTrashUseCase) {
    super(useCase);
  }

  async handle({ params, user }: HttpRequest): Promise<HttpResponse> {
    const result = await this._useCase.handle({
      id: params?.id,
      ownerId: user?.id,
    });

    await deleteFromFileSystem(path.join(config.mediaConfig.PATH_TO_MEDIA_DIR, result.deletedFile.filePath!));

    if (result.deletedFile.hasThumbnail)
      await deleteFromFileSystem(path.join(config.mediaConfig.PATH_TO_MEDIA_DIR, result.deletedFile.thumbnailPath!));

    return this._noContent();
  }
}
