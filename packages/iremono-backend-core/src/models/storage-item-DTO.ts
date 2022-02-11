import { StorageItem } from '../entities';

export interface StorageItemDTO {
  id?: string;
  name: string;
  parentId: string | null;
  ownerId: string;
  filePath?: string;
  fileSize?: string;
  mimeType?: string;
  fileExtension?: string;
  isFolder: boolean;
  isInTrash?: boolean;
  lastViewedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export const makeStorageItemDTO = (storageItem: StorageItem): StorageItemDTO => ({
  id: storageItem.id,
  name: storageItem.name,
  parentId: storageItem.parentId,
  ownerId: storageItem.ownerId,
  filePath: storageItem.filePath,
  fileSize: storageItem.fileSize,
  fileExtension: storageItem.fileExtension,
  mimeType: storageItem.mimeType,
  isFolder: storageItem.isFolder,
  isInTrash: storageItem.isInTrash,
  lastViewedAt: storageItem.lastViewedAt,
  createdAt: storageItem.createdAt,
  updatedAt: storageItem.updatedAt,
});
