import fs from 'fs';
import { CryptoService } from '@iremono/backend-core/src/services/crypto-service';
import { DownloadFileUseCase } from '@iremono/backend-core/src/use-cases';
import { Logger, LoggerFactory } from '@iremono/util/src/logger';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { makeDownloadFileRequestDTO } from './make-download-file-request-DTO';
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
    const dto = makeDownloadFileRequestDTO(request);
    const result = await this._useCase.handle(dto);

    const readStream = fs.createReadStream(result.filePath).on('error', (err) => this._logger.error(err));
    const decipherStream = this._cryptoService.generateDecipherStreamInCBC(
      config.mediaConfig.ENCRYPTION_KEY,
      result.fileInitializationVector,
    );
    const decryptedFileReadStream = readStream.pipe(decipherStream);

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
