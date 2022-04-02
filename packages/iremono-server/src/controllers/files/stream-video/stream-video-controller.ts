import fs from 'fs';
import path from 'path';
import { CryptoService } from '@iremono/backend-core/dist/services/crypto-service';
import { StreamVideoRequestDTO, StreamVideoUseCase } from '@iremono/backend-core/dist/use-cases';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';
import { config } from '../../../config';
import { SkipStream } from '../../../shared/utils/skip-stream';

export class StreamVideoController extends Controller<StreamVideoUseCase> {
  private readonly _cryptoService: CryptoService;

  constructor(useCase: StreamVideoUseCase, cryptoService: CryptoService) {
    super(useCase);
    this._cryptoService = cryptoService;
  }

  async handle({ params, query, headers, fullPath, method, host, ip }: HttpRequest): Promise<HttpResponse> {
    const dto: StreamVideoRequestDTO = {
      streamFileToken: query?.token,
      id: params?.id,
    };

    const result = await this._useCase.handle(dto);

    const streamRange = headers.range || 'bytes=0-';
    const parsedFileSize = parseInt(result.fileSize.toString(), 10);
    const startEnd = streamRange.replace(/bytes=/, '').split('-');
    const [start, end] = startEnd.map((part) => (part ? parseInt(part, 10) : parsedFileSize - 1));
    const chunkSize = end - start + 1;

    let fixedStart = 0;
    let fixedEnd;

    if (start === 0 && end === 1) {
      fixedStart = 0;
      fixedEnd = 15;
    } else {
      fixedStart = start % 16 === 0 ? start : Math.floor((start - 1) / 16) * 16 - 16;
    }

    /*
      The first block can be decrypted with Initialization Vector but
      each of the other block can be decrypted only with the previous encrypted block (cipher text)
      because they are all encrypted with the previous block like a block chain.
      see the "Cipher block chaining (CBC)" section in https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation
    */
    const currentInitVector =
      start === 0
        ? result.fileInitializationVector
        : await this.getPrevCipherText(
            fixedStart - 16,
            path.join(config.mediaConfig.PATH_TO_MEDIA_DIR, result.filePath!),
          );

    const decipherStream = this._cryptoService.generateDecipherStreamInCBC(
      config.mediaConfig.ENCRYPTION_KEY,
      currentInitVector,
    );

    decipherStream.setAutoPadding(false);

    const skipStream = new SkipStream({ skipLength: start - fixedStart });

    const readStream = fs
      .createReadStream(path.join(config.mediaConfig.PATH_TO_MEDIA_DIR, result.filePath), {
        start: fixedStart,
        end: fixedEnd,
      })
      .on('error', (err) => console.log(err));

    let videoReadStream;

    if (result.clientEncryptionKey) {
      const decipherWithClientKeyStream = this._cryptoService.generateDecipherStreamInCBC(
        result.clientEncryptionKey,
        result.fileInitializationVector,
      );

      videoReadStream = readStream.pipe(decipherWithClientKeyStream).pipe(decipherStream).pipe(skipStream);
    } else {
      videoReadStream = readStream.pipe(decipherStream).pipe(skipStream);
    }

    return this._streamVideo(videoReadStream, {
      'Content-Range': `bytes ${start}-${end}/${parsedFileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'video/mp4',
    });
  }

  private getPrevCipherText = (start: number, pathToFile: string) =>
    new Promise<string>((resolve, reject) => {
      fs.createReadStream(pathToFile, {
        start,
        end: start + 15,
      })
        .on('data', (data) => resolve(data.toString('hex')))
        .on('error', (err) => reject(err));
    });
}
