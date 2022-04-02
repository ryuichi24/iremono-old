import path from 'path';
import { DeleteFileInTrashRequestDTO, DeleteFileInTrashUseCase } from '@iremono/backend-core/dist/use-cases';
import { Logger, LoggerFactory } from '@iremono/util/dist/logger';
import { deleteFromFileSystem } from '@iremono/util/dist/file-system';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { config } from '../../../config';

export class DeleteFileInTrashController extends Controller<DeleteFileInTrashUseCase> {
  private readonly _logger: Logger;

  constructor(useCase: DeleteFileInTrashUseCase, loggerFactory: LoggerFactory) {
    super(useCase);
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle({ params, user, fullPath, method, host, ip }: HttpRequest): Promise<HttpResponse> {
    const dto: DeleteFileInTrashRequestDTO = {
      id: params?.id,
      ownerId: user?.id,
    };

    const result = await this._useCase.handle(dto);

    await deleteFromFileSystem(path.join(config.mediaConfig.PATH_TO_MEDIA_DIR, result.deletedFile.filePath!));

    if (result.deletedFile.hasThumbnail)
      await deleteFromFileSystem(path.join(config.mediaConfig.PATH_TO_MEDIA_DIR, result.deletedFile.thumbnailPath!));

    this._logger.info(
      'user has deleted a folder in trash',
      `[path="${fullPath}", method="${method}", host="${host}", ip="${ip}", message="user has deleted a folder in trash"]`,
    );

    return this._noContent();
  }
}
