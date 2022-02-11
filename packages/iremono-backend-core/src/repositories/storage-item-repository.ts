import { StorageItem } from '../entities';

export interface StorageItemRepository {
  save(entity: StorageItem): Promise<StorageItem>;
  findOneById(id: string, ownerId: string): Promise<StorageItem | null>;
  findByParentId(parentId: string, ownerId: string, inTrash: boolean): Promise<StorageItem[]>;
  findAllDescendantsById(id: string, ownerId: string, inTrash: boolean): Promise<StorageItem[]>;
}
