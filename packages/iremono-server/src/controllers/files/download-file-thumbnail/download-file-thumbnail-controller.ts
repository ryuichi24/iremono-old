import fs from 'fs';
import { CryptoService } from '@iremono/backend-core/src/services/crypto-service';
import { DownloadFileThumbnailUseCase } from '@iremono/backend-core/src/use-cases';
import { Logger, LoggerFactory } from '@iremono/util/src/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { makeDownloadFileThumbnailRequestDTO } from './make-download-file-thumbnail-request-DTO';
import { config } from '../../../config';

export class DownloadFileThumbnailController extends Controller<DownloadFileThumbnailUseCase> {
  private readonly _logger: Logger;
  private readonly _cryptoService: CryptoService;

  constructor(useCase: DownloadFileThumbnailUseCase, cryptoService: CryptoService, loggerFactory: LoggerFactory) {
    super(useCase);
    this._cryptoService = cryptoService;
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const dto = makeDownloadFileThumbnailRequestDTO(request);
    const result = await this._useCase.handle(dto);

    const readStream = fs.createReadStream(result.thumbnailPath).on('error', (err) => this._logger.error(err));
    const decipherStream = this._cryptoService.generateDecipherStreamInCBC(
      config.mediaConfig.ENCRYPTION_KEY,
      result.thumbnailInitializationVector
    );
    const decryptedFileReadStream = readStream.pipe(decipherStream);

    this._logger.info(
      'user has downloaded the file',
      `[path="${request.fullPath}", method="${request.method}", host="${request.host}", ip="${request.ip}", message="user has downloaded the file"]`,
    );

    return this._download(decryptedFileReadStream, {
      'Content-type': 'image/png',
      'Content-Disposition': `attachment; filename="${result.name}"`,
      'Content-Length': result.thumbnailSize,
    });
  }
}
