import crypto from 'crypto';
import fs from 'fs';
import stream from 'stream';
import path from 'path';
import express from 'express';
import sharp from 'sharp';
import { createFolderIfNotExists } from '@iremono/util';
import { parseMultipart } from '../../multipart-parser';
import { loggerFactory } from '../../utils/logger';
import { CryptoService } from '@iremono/backend-core/dist/services/crypto-service';
import { deleteFromFileSystem, fileTypeChecker, getFileType } from '@iremono/util/dist/file-system';

const logger = loggerFactory.createLogger('uploadHandler');

export const uploadHandler =
  ({ folderPath, encryptionKey }: { folderPath: string; encryptionKey: string }, cryptoService: CryptoService) =>
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      // base dir initialization
      const userMediaDir = path.join(folderPath, 'iremono_media', req.user.id);

      const filesDir = path.join(userMediaDir, 'files');
      const thumbnailsDir = path.join(userMediaDir, 'thumbnails');
      const uploadsDir = path.join(userMediaDir, 'uploads');

      await createFolderIfNotExists(filesDir);
      await createFolderIfNotExists(thumbnailsDir);
      await createFolderIfNotExists(uploadsDir);

      // uploading file
      const uploadingFileDest = path.join(uploadsDir, crypto.randomUUID());
      const uploadingFileWriteStream = fs.createWriteStream(uploadingFileDest);

      const { fileName, formData } = await parseMultipart(req, req.headers, (file) => {
        file.pipe(uploadingFileWriteStream);
      });

      // get file size of the uploaded file
      const uploadedFileSize = (await fs.promises.stat(uploadingFileDest)).size;

      // get file type of the uploaded file
      const fileType = await getFileType(uploadingFileDest);

      // generate thumbnail
      let thumbnailPath;
      let thumbnailSize;
      let thumbnailInitializationVector;

      if (fileTypeChecker.isImage(fileType.fileExtension)) {
        thumbnailPath = path.join(thumbnailsDir, crypto.randomUUID());

        const thumbnailWriteStream = fs.createWriteStream(thumbnailPath);
        const uploadedFileReadStream = fs.createReadStream(uploadingFileDest);

        const imageResizeStream = sharp()
          .resize(300)
          .png()
          .on('info', (info) => (thumbnailSize = info.size))
          .on('error', (err: Error) => console.log(err));

        thumbnailInitializationVector = cryptoService.generateInitializeVector();
        const thumbnailCipherStream = cryptoService.generateCipherStreamInCBC(
          encryptionKey,
          thumbnailInitializationVector,
        );

        await stream.promises.pipeline(
          uploadedFileReadStream,
          imageResizeStream,
          thumbnailCipherStream,
          thumbnailWriteStream,
        );
      }

      if (fileTypeChecker.isVideo(fileType.fileExtension)) {
        // TODO: add video thumbnail generation
      }

      // encrypt uploaded file
      const fileDest = path.join(filesDir, crypto.randomUUID());
      const encryptedFileWriteStream = fs.createWriteStream(fileDest);
      const uploadedFileReadStream2 = fs.createReadStream(uploadingFileDest);

      const fileInitializationVector = cryptoService.generateInitializeVector();
      const fileCipherStream = cryptoService.generateCipherStreamInCBC(encryptionKey, fileInitializationVector);

      await stream.promises.pipeline(uploadedFileReadStream2, fileCipherStream, encryptedFileWriteStream);

      // delete uploaded file
      await deleteFromFileSystem(uploadingFileDest);

      req.uploadedFile = {
        fileName,
        mimeType: fileType.mimeType,
        fileExtension: fileType.fileExtension,
        fileSize: uploadedFileSize,
        formData,
        filePath: fileDest,
        fileInitializationVector,
        thumbnail: {
          thumbnailPath,
          thumbnailSize,
          thumbnailInitializationVector,
        },
      };

      next();
    } catch (error) {
      if (error instanceof Error) {
        logger.error(
          error.message,
          `[path="${req.originalUrl}", method="${req.method}", host="${req.hostname}", ip="${req.ip}", message="${error.message}"]`,
        );

        next(new Error(error.message));
      }
    }
  };
