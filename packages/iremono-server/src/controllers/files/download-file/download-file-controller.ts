import fs from 'fs';
import path from 'path';
import { CryptoService } from '@iremono/backend-core/dist/services/crypto-service';
import { DownloadFileRequestDTO, DownloadFileUseCase } from '@iremono/backend-core/dist/use-cases';
import { Logger, LoggerFactory } from '@iremono/util/dist/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { config } from '../../../config';

export class DownloadFileController extends Controller<DownloadFileUseCase> {
  private readonly _logger: Logger;
  private readonly _cryptoService: CryptoService;

  constructor(useCase: DownloadFileUseCase, cryptoService: CryptoService, loggerFactory: LoggerFactory) {
    super(useCase);
    this._cryptoService = cryptoService;
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;
    const { token } = request.query;

    const dto: DownloadFileRequestDTO = {
      downloadFileToken: token,
      id,
    };

    const result = await this._useCase.handle(dto);

    this._logger.debug(result);

    const readStream = fs.createReadStream(path.join(config.mediaConfig.PATH_TO_MEDIA_DIR, result.filePath));
    const decipherStream = this._cryptoService.generateDecipherStreamInCBC(
      config.mediaConfig.ENCRYPTION_KEY,
      result.fileInitializationVector,
    );

    let decryptedFileReadStream;

    if (result.clientEncryptionKey) {
      const decipherWithClientKeyStream = this._cryptoService.generateDecipherStreamInCBC(
        result.clientEncryptionKey,
        result.fileInitializationVector,
      );

      decryptedFileReadStream = readStream.pipe(decipherWithClientKeyStream).pipe(decipherStream);
    } else {
      decryptedFileReadStream = readStream.pipe(decipherStream);
    }

    this._logger.info(
      'user has downloaded the file',
      `[path="${request.fullPath}", method="${request.method}", host="${request.host}", ip="${request.ip}", message="user has downloaded the file"]`,
    );

    return this._download(decryptedFileReadStream, {
      'Content-type': result.mimeType,
      'Content-Disposition': `attachment; filename="${result.name}"`,
      'Content-Length': result.fileSize,
    });
  }
}
