import fs from 'fs';
import path from 'path';
import { CryptoService } from '@iremono/backend-core/dist/services/crypto-service';
import { DownloadFileThumbnailRequestDTO, DownloadFileThumbnailUseCase } from '@iremono/backend-core/dist/use-cases';
import { Logger, LoggerFactory } from '@iremono/util/dist/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { config } from '../../../config';

export class DownloadFileThumbnailController extends Controller<DownloadFileThumbnailUseCase> {
  private readonly _logger: Logger;
  private readonly _cryptoService: CryptoService;

  constructor(useCase: DownloadFileThumbnailUseCase, cryptoService: CryptoService, loggerFactory: LoggerFactory) {
    super(useCase);
    this._cryptoService = cryptoService;
    this._logger = loggerFactory.createLogger(this.constructor.name);
  }

  async handle({ params, user, headers, fullPath, method, host, ip }: HttpRequest): Promise<HttpResponse> {
    const dto: DownloadFileThumbnailRequestDTO = {
      ownerId: user?.id,
      id: params?.id,
      clientEncryptionKey: headers['encryption-key'],
    };

    const result = await this._useCase.handle(dto);

    const readStream = fs.createReadStream(path.join(config.mediaConfig.PATH_TO_MEDIA_DIR, result.thumbnailPath));
    const decipherStream = this._cryptoService.generateDecipherStreamInCBC(
      config.mediaConfig.ENCRYPTION_KEY,
      result.thumbnailInitializationVector,
    );

    let decryptedFileReadStream;

    if (result.clientEncryptionKey) {
      const decipherWithClientKeyStream = this._cryptoService.generateDecipherStreamInCBC(
        result.clientEncryptionKey,
        result.thumbnailInitializationVector,
      );

      decryptedFileReadStream = readStream.pipe(decipherWithClientKeyStream).pipe(decipherStream);
    } else {
      decryptedFileReadStream = readStream.pipe(decipherStream);
    }

    this._logger.info(
      'user has downloaded the file',
      `[path="${fullPath}", method="${method}", host="${host}", ip="${ip}", message="user has downloaded the file"]`,
    );

    return this._download(decryptedFileReadStream, {
      'Content-type': 'image/png',
      'Content-Disposition': `attachment; filename="${result.name}"`,
      'Content-Length': result.thumbnailSize,
    });
  }
}
