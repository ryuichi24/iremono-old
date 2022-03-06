export interface UploadFileRequestDTO {
  name: string;
  parentId: string;
  ownerId: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
  fileInitializationVector: string;
  thumbnailPath: string;
  thumbnailSize: number;
  thumbnailInitializationVector: string;
  isCryptoFolderItem: boolean;
}
