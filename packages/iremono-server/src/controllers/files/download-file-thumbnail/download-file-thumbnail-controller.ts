import fs from 'fs';
import { CryptoService } from '@iremono/backend-core/dist/services/crypto-service';
import { DownloadFileThumbnailUseCase } from '@iremono/backend-core/dist/use-cases';
import { Logger, LoggerFactory } from '@iremono/util/dist/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { makeDownloadFileThumbnailRequestDTO } from './make-download-file-thumbnail-request-DTO';
import { config } from '../../../config';
import { BadRequestError } from '../../../shared/utils/errors';

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

    const readStream = fs.createReadStream(result.thumbnailPath);
    const decipherStream = this._cryptoService.generateDecipherStreamInCBC(
      config.mediaConfig.ENCRYPTION_KEY,
      result.thumbnailInitializationVector,
    );

    let decryptedFileReadStream;

    if (result.clientEncryptionKeyInitializationVector) {
      const clientEncryptedEncryptionKey = request.query?.ceek || request.cookies?.ceek;
      if (!clientEncryptedEncryptionKey) throw new BadRequestError('the encryption key is not provided.');
      const decryptedClientEncryptionKey = this._cryptoService.decryptInCBC(
        clientEncryptedEncryptionKey,
        config.mediaConfig.ENCRYPTION_KEY_FOR_CLIENT_ENCRYPTION_KEY,
        result.clientEncryptionKeyInitializationVector,
      );

      const decipherWithClientKeyStream = this._cryptoService.generateDecipherStreamInCBC(
        decryptedClientEncryptionKey,
        result.thumbnailInitializationVector,
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
      'Content-type': 'image/png',
      'Content-Disposition': `attachment; filename="${result.name}"`,
      'Content-Length': result.thumbnailSize,
    });
  }
}