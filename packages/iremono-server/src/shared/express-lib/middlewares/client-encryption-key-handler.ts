import crypto from 'crypto';
import fs from 'fs';
import stream from 'stream';
import path from 'path';
import { CryptoService } from '@iremono/backend-core/src/services/crypto-service';
import express from 'express';
import { deleteFromFileSystem } from '@iremono/util';
import { loggerFactory } from '../../utils/logger';

const logger = loggerFactory.createLogger('clientEncryptionKeyHandler');

interface Options {
  mediaDirPath: string;
  mediaDirName: string;
}

export const clientEncryptionKeyHandler =
  ({ mediaDirPath, mediaDirName }: Options, cryptoService: CryptoService) =>
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const clientEncryptionKey = req.uploadedFile.formData.encryptionKey;

      if (!clientEncryptionKey) return next();

      req.uploadedFile.isCryptoFolderItem = true;

      const userMediaDir = path.join(mediaDirName, req.user.id);
      const filesDir = path.join(userMediaDir, 'files');
      const thumbnailsDir = path.join(userMediaDir, 'thumbnails');

      req.uploadedFile.isCryptoFolderItem = true;

      const fileDest = path.join(filesDir, crypto.randomUUID());
      const encryptedWithClientKeyFileWriteStream = fs.createWriteStream(path.join(mediaDirPath, fileDest));
      const uploadedFileReadStream = fs.createReadStream(path.join(mediaDirPath, req.uploadedFile.filePath));

      const fileCipherWithClientKeyStream = cryptoService.generateCipherStreamInCBC(
        clientEncryptionKey,
        req.uploadedFile.fileInitializationVector,
      );

      await stream.promises.pipeline(
        uploadedFileReadStream,
        fileCipherWithClientKeyStream,
        encryptedWithClientKeyFileWriteStream,
      );

      await deleteFromFileSystem(path.join(mediaDirPath, req.uploadedFile.filePath));
      req.uploadedFile.filePath = fileDest;

      if (!req.uploadedFile.thumbnail.thumbnailPath) return next();

      const uploadedThumbnailReadStream = fs.createReadStream(
        path.join(mediaDirPath, req.uploadedFile.thumbnail.thumbnailPath),
      );

      const thumbnailCipherWithClientKeyStream = cryptoService.generateCipherStreamInCBC(
        clientEncryptionKey,
        req.uploadedFile.thumbnail.thumbnailInitializationVector,
      );

      const thumbnailDest = path.join(thumbnailsDir, crypto.randomUUID());
      const thumbnailWriteStream = fs.createWriteStream(path.join(mediaDirPath, thumbnailDest));

      await stream.promises.pipeline(
        uploadedThumbnailReadStream,
        thumbnailCipherWithClientKeyStream,
        thumbnailWriteStream,
      );

      await deleteFromFileSystem(path.join(mediaDirPath, req.uploadedFile.thumbnail.thumbnailPath));
      req.uploadedFile.thumbnail.thumbnailPath = thumbnailDest;

      next();
    } catch (error) {
      if (error instanceof Error) {
        logger.error(
          error.stack,
          `[path="${req.originalUrl}", method="${req.method}", host="${req.hostname}", ip="${req.ip}", message="${error.message}"]`,
        );

        next(new Error(error.message));
      }
    }
  };
