import path from 'path';
import { DeleteAllInTrashRequestDTO, DeleteAllInTrashUseCase } from '@iremono/backend-core/dist/use-cases';
import { deleteFromFileSystem } from '@iremono/util/dist/file-system';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { config } from '../../../config';

export class DeleteAllInTrashController extends Controller<DeleteAllInTrashUseCase> {
  constructor(useCase: DeleteAllInTrashUseCase) {
    super(useCase);
  }

  async handle({ user }: HttpRequest): Promise<HttpResponse> {
    const dto: DeleteAllInTrashRequestDTO = {
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
