export interface DownloadFileThumbnailResponseDTO {
  name: string;
  thumbnailPath: string;
  thumbnailSize: number;
  thumbnailInitializationVector: string;
  clientEncryptionKey?: string;
}
