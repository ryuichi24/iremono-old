import fs from 'fs';

export const createFolderIfNotExists = (path: string) =>
  new Promise<void>((resolve, reject) => {
    if (fs.existsSync(path)) return resolve();
    fs.mkdir(path, { recursive: true }, (err) => {
      err ? reject(err) : resolve();
    });
  });
