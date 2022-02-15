import { fileTypeFromFile } from 'file-type';

export const getFileType = async (pathToFile: string) => {
  const fileType = await fileTypeFromFile(pathToFile);
  if (!fileType) throw new Error('the file might be broken or cannot be found.');
  return {
    fileExtension: fileType?.ext.toString(),
    mimeType: fileType?.mime.toString(),
  };
};
