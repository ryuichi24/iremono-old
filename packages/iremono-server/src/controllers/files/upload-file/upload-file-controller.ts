import { UploadFileRequestDTO, UploadFileUseCase } from '@iremono/backend-core/dist/use-cases';
import { Logger, LoggerFactory } from '@iremono/util/dist/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class UploadFileController extends Controller<UploadFileUseCase> {
  private readonly _logger: Logger;

  constructor(useCase: UploadFileUseCase, loggerFactory: LoggerFactory) {
    super(useCase);
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const {
      fileName,
      filePath,
      fileSize,
      mimeType,
      fileInitializationVector,
      formData: { parentId },
      thumbnail: { thumbnailPath, thumbnailSize, thumbnailInitializationVector },
      isCryptoFolderItem,
    } = request.uploadedFile;

    const dto: UploadFileRequestDTO = {
      name: fileName,
      parentId,
      filePath,
      fileSize,
      mimeType,
      fileInitializationVector,
      ownerId: request.user.id,
      thumbnailPath,
      thumbnailSize,
      thumbnailInitializationVector,
      isCryptoFolderItem,
    };

    const result = await this._useCase.handle(dto);

    this._logger.info(
      'user has uploaded a file',
      `[path="${request.fullPath}", method="${request.method}", host="${request.host}", ip="${request.ip}", message="user has uploaded a file"]`,
    );

    return this._created(result);
  }
}
``