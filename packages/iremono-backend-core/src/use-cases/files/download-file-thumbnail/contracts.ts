import { UseCase } from '../../../shared/use-case-lib/interfaces';

export interface DownloadFileThumbnailRequestDTO {
  id: string;
  ownerId: string;
  clientEncryptionKey?: string;
}

export interface DownloadFileThumbnailResponseDTO {
  name: string;
  thumbnailPath: string;
  thumbnailSize: number;
  thumbnailInitializationVector: string;
  clientEncryptionKey?: string;
}

export interface IDownloadFileThumbnailUseCase
  extends UseCase<DownloadFileThumbnailRequestDTO, DownloadFileThumbnailResponseDTO> {}
