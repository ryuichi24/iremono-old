export interface DownloadFileResponseDTO {
  name: string;
  mimeType: string;
  fileSize: number;
  filePath: string;
  fileInitializationVector: string;
}
