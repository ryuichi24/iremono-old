import { UseCase } from '../../../shared/use-case-lib/interfaces';

export interface DownloadFileRequestDTO {
  id: string;
  downloadFileToken: string;
}

export interface DownloadFileResponseDTO {
  name: string;
  mimeType: string;
  fileSize: number;
  filePath: string;
  fileInitializationVector: string;
  clientEncryptionKey?: string;
}

export interface IDownloadFileUseCase extends UseCase<DownloadFileRequestDTO, DownloadFileResponseDTO> {}
