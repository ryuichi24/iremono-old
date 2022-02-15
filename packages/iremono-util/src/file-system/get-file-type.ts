import { fileTypeFromFile } from 'file-type';

export const getFileType = async (pathToFile: string) => {
  const fileType = await fileTypeFromFile(pathToFile);
  return {
    fileExtension: fileType?.ext.toString(),
    mimeType: fileType?.mime.toString(),
  };
};
