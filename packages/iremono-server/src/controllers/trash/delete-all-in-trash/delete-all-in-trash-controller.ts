import path from 'path';
import { IDeleteAllInTrashUseCase } from '@iremono/backend-core/dist/use-cases/trash/delete-all-in-trash';
import { deleteFromFileSystem } from '@iremono/util/dist/file-system';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { config } from '../../../config';

export class DeleteAllInTrashController extends Controller<IDeleteAllInTrashUseCase> {
  constructor(useCase: IDeleteAllInTrashUseCase) {
    super(useCase);
  }

  async handle({ user }: HttpRequest): Promise<HttpResponse> {
    const result = await this._useCase.handle({
      ownerId: user.id,
    });

    await Promise.all(
      result.deletedFiles.map((file) => {
        deleteFromFileSystem(path.join(config.mediaConfig.PATH_TO_MEDIA_DIR, file.filePath!));
        if (file.hasThumbnail)
          deleteFromFileSystem(path.join(config.mediaConfig.PATH_TO_MEDIA_DIR, file.thumbnailPath!));
      }),
    );

    return this._noContent();
  }
}
