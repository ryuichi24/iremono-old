import path from 'path';
import { IDeleteFolderInTrashUseCase } from '@iremono/backend-core/dist/use-cases/trash/delete-folder-in-trash';
import { deleteFromFileSystem } from '@iremono/util/dist/file-system';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { config } from '../../../config';

export class DeleteFolderInTrashController extends Controller<IDeleteFolderInTrashUseCase> {
  constructor(useCase: IDeleteFolderInTrashUseCase) {
    super(useCase);
  }

  async handle({ params, user }: HttpRequest): Promise<HttpResponse> {
    const result = await this._useCase.handle({
      id: params?.id,
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
