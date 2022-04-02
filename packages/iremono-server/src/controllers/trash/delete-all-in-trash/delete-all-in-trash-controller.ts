import path from 'path';
import { DeleteAllInTrashRequestDTO, DeleteAllInTrashUseCase } from '@iremono/backend-core/dist/use-cases';
import { Logger, LoggerFactory } from '@iremono/util/dist/logger';
import { deleteFromFileSystem } from '@iremono/util/dist/file-system';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { config } from '../../../config';

export class DeleteAllInTrashController extends Controller<DeleteAllInTrashUseCase> {
  private readonly _logger: Logger;

  constructor(useCase: DeleteAllInTrashUseCase, loggerFactory: LoggerFactory) {
    super(useCase);
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle({ user, fullPath, method, host, ip }: HttpRequest): Promise<HttpResponse> {
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

    this._logger.info(
      'user has deleted all in trash',
      `[path="${fullPath}", method="${method}", host="${host}", ip="${ip}", message="user has deleted all in trash"]`,
    );

    return this._noContent();
  }
}
