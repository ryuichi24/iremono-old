import makeBusboy from 'busboy';
import { IncomingHttpHeaders } from 'http2';

interface Parsed {
  fileName: string;
  mimeType: string;
  formData: any;
}

export const parseMultipart = (
  readableStream: NodeJS.ReadableStream,
  headers: IncomingHttpHeaders,
  callback: (file: NodeJS.ReadableStream) => void,
) =>
  new Promise<Parsed>((resolve, reject) => {
    const uploadedFile: Parsed = {
      fileName: '',
      mimeType: '',
      formData: {},
    };

    const busboy = makeBusboy({ headers })
      .on('file', function (formFieldName, fileReadableStream, { filename, encoding, mimeType }) {
        uploadedFile['fileName'] = filename;
        uploadedFile['mimeType'] = mimeType;
        callback(fileReadableStream);

        fileReadableStream.on('end', function () {
          console.log(`${filename} has been successfully uploaded`);
        });
      })
      .on('field', function (formFieldName, value, { nameTruncated, encoding, mimeType, valueTruncated }) {
        uploadedFile['formData'][formFieldName] = value;
      })
      .on('finish', function () {
        resolve(uploadedFile);
      })
      .on('error', function () {
        readableStream.unpipe(busboy);
        reject(new Error('something went wrong with parsing multipart'));
      });

    readableStream.pipe(busboy);
  });
