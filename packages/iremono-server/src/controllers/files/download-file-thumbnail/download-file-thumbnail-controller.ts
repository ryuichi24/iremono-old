import fs from 'fs';
import path from 'path';
import { CryptoService } from '@iremono/backend-core/dist/services/crypto-service';
import { IDownloadFileThumbnailUseCase } from '@iremono/backend-core/dist/use-cases/files/download-file-thumbnail/contracts';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { config } from '../../../config';

export class DownloadFileThumbnailController extends Controller<IDownloadFileThumbnailUseCase> {
  private readonly _cryptoService: CryptoService;

  constructor(useCase: IDownloadFileThumbnailUseCase, cryptoService: CryptoService) {
    super(useCase);
    this._cryptoService = cryptoService;
  }

  async handle({ params, user, headers }: HttpRequest): Promise<HttpResponse> {
    const result = await this._useCase.handle({
      ownerId: user?.id,
      id: params?.id,
      clientEncryptionKey: headers['encryption-key'],
    });

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

    return this._download(decryptedFileReadStream, {
      'Content-type': 'image/png',
      'Content-Disposition': `attachment; filename="${result.name}"`,
      'Content-Length': result.thumbnailSize,
    });
  }
}
