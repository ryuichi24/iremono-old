import { StorageItem } from '../entities';

export interface StorageItemRepository {
  save(entity: StorageItem): Promise<StorageItem>;
  remove(entity: StorageItem): Promise<void>;
  findOneById(id: string): Promise<StorageItem | null>;
  findByParentId(parentId: string, ownerId: string, inTrash: boolean): Promise<StorageItem[]>;
  findAllDescendantsById(id: string, ownerId: string, inTrash: boolean): Promise<StorageItem[]>;
  findRootFolderByOwnerId(ownerId: string): Promise<StorageItem | null>;
}
