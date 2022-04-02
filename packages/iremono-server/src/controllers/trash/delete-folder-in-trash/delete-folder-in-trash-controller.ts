import path from 'path';
import { DeleteFolderInTrashRequestDTO, DeleteFolderInTrashUseCase } from '@iremono/backend-core/dist/use-cases';
import { deleteFromFileSystem } from '@iremono/util/dist/file-system';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { config } from '../../../config';

export class DeleteFolderInTrashController extends Controller<DeleteFolderInTrashUseCase> {
  constructor(useCase: DeleteFolderInTrashUseCase) {
    super(useCase);
  }

  async handle({ params, user }: HttpRequest): Promise<HttpResponse> {
    const dto: DeleteFolderInTrashRequestDTO = {
      id: params?.id,
      ownerId: user.id,
    };

    const result = await this._useCase.handle(dto);

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
