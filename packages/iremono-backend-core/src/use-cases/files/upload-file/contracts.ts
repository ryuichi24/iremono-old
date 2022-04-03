import { StorageItemDTO } from '../../../models/storage-item-DTO';
import { UseCase } from '../../../shared/use-case-lib/interfaces';

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

export interface UploadFileResponseDTO extends StorageItemDTO {}

export interface IUploadFileUseCase extends UseCase<UploadFileRequestDTO, UploadFileResponseDTO> {}
