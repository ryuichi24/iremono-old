import fs from 'fs';

export const deleteFromFileSystem = async (pathToFile: string): Promise<void> =>
  new Promise<void>((resolve, reject) => {
    fs.unlink(pathToFile, (err) => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });
