export interface UploadFileRequestDTO {
  name: string;
  parentId: string;
  ownerId: string;
  filePath: string;
  fileSize: string;
  mimeType: string;
  fileInitializationVector: string;
  thumbnailPath: string;
  thumbnailSize: string;
  thumbnailInitializationVector: string;
}
