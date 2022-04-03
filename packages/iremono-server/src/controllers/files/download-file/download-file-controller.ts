import fs from 'fs';
import path from 'path';
import { CryptoService } from '@iremono/backend-core/dist/services/crypto-service';
import { IDownloadFileUseCase } from '@iremono/backend-core/dist/use-cases/files/download-file/contracts';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { config } from '../../../config';

export class DownloadFileController extends Controller<IDownloadFileUseCase> {
  private readonly _cryptoService: CryptoService;

  constructor(useCase: IDownloadFileUseCase, cryptoService: CryptoService) {
    super(useCase);
    this._cryptoService = cryptoService;
  }

  async handle({ params, query }: HttpRequest): Promise<HttpResponse> {
    const result = await this._useCase.handle({
      downloadFileToken: query?.token,
      id: params?.id,
    });

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

    return this._download(decryptedFileReadStream, {
      'Content-type': result.mimeType,
      'Content-Disposition': `attachment; filename="${result.name}"`,
      'Content-Length': result.fileSize,
    });
  }
}
