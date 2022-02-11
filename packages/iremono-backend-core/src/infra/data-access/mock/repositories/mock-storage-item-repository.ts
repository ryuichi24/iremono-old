import { LoggerFactory } from '@iremono/util/src/logger';
import { StorageItem } from '../../../../entities';
import { StorageItemRepository } from '../../../../repositories';

interface StorageItemRow {
  id: string;
  name: string;
  parentId: string;
  ancestors: (string | null)[];
  ownerId: string;
  filePath?: string;
  fileSize?: string;
  mimeType?: string;
  fileExtension?: string;
  isFolder: boolean;
  isInTrash: boolean;
  lastViewedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const storageItemTable: StorageItemRow[] = [];

export const constructMockStorageItemRepository = (loggerFactory: LoggerFactory): StorageItemRepository => {
  const logger = loggerFactory.createLogger('MockStorageItemRepository');

  const insert = async (entity: StorageItem) => {
    const parentFolder = storageItemTable.find((item) => item.id === entity.id);
    const ancestors = parentFolder ? [...parentFolder.ancestors, entity.id] : [];
    const row = makeStorageItemRowFromEntity(entity, ancestors);
    storageItemTable.push(row);
  };

  const update = (entity: StorageItem) => {
    const parentFolder = storageItemTable.find((item) => item.id === entity.id);
    const indexOfEntity = storageItemTable.findIndex((item) => item.id === entity.id);
    const itemToUpdate = storageItemTable.splice(indexOfEntity, 1)[0];
    const ancestors = parentFolder ? [...parentFolder.ancestors, entity.id] : [];

    itemToUpdate.id = entity.id!;
    itemToUpdate.name = entity.name;
    itemToUpdate.parentId = entity.id!;
    itemToUpdate.ancestors = ancestors;
    itemToUpdate.ownerId = entity.ownerId;
    itemToUpdate.filePath = entity.filePath;
    itemToUpdate.fileSize = entity.fileSize;
    itemToUpdate.mimeType = entity.mimeType;
    itemToUpdate.fileExtension = entity.fileExtension;
    itemToUpdate.isFolder = entity.isFolder;
    itemToUpdate.isInTrash = entity.isInTrash!;
    itemToUpdate.lastViewedAt = entity.lastViewedAt!;
    itemToUpdate.createdAt = entity.createdAt!;
    itemToUpdate.updatedAt = entity.updatedAt!;

    storageItemTable.push(itemToUpdate);
  };

  return {
    save: async (entity: StorageItem) => {
      const entityExists = !!storageItemTable.find((item) => item.id === entity.id && item.ownerId === entity.ownerId);

      if (!entityExists) await insert(entity);
      if (entityExists) await update(entity);

      logger.debug(
        `a storage item has been saved.`,
        `[storage-item-memory-table="${JSON.stringify(storageItemTable, null, '\t')}"]`,
      );

      return entity;
    },
    findOneById: async (id: string, ownerId: string) => {
      const foundItem = storageItemTable.find((item) => item.id === id && item.ownerId === ownerId);
      if (!foundItem) return null;

      return makeStorageItemEntityFromRow(foundItem);
    },
    findByParentId: async (parentId: string, ownerId: string, inTrash: boolean = false) => {
      const foundItems = storageItemTable.filter(
        (item) =>
          item.parentId === parentId && item.ownerId === ownerId && (inTrash ? item.isInTrash : !item.isInTrash),
      );
      return foundItems.map((item) => makeStorageItemEntityFromRow(item));
    },
    findAllDescendantsById: async (id: string, ownerId: string, inTrash: boolean = false) => {
      const descendants = storageItemTable.filter(
        (item) =>
          item.ancestors.includes(id) && item.ownerId === ownerId && (inTrash ? item.isInTrash : !item.isInTrash),
      );
      return descendants.map((descendant) => makeStorageItemEntityFromRow(descendant));
    },
  };
};

const makeStorageItemEntityFromRow = (row: StorageItemRow) =>
  new StorageItem(
    {
      name: row.name,
      isFolder: row.isFolder,
      ownerId: row.ownerId,
      parentId: row.parentId,
      filePath: row.filePath,
      mimeType: row.mimeType,
      fileSize: row.fileSize,
      fileExtension: row.fileExtension,
      isInTrash: row.isInTrash,
      lastViewedAt: row.lastViewedAt,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    },
    row.id,
  );

const makeStorageItemRowFromEntity = (entity: StorageItem, ancestors: (string | null)[]) => ({
  id: entity.id!,
  name: entity.name,
  parentId: entity.id!,
  ancestors: ancestors,
  ownerId: entity.ownerId,
  filePath: entity.filePath,
  fileSize: entity.fileSize,
  mimeType: entity.mimeType,
  fileExtension: entity.fileExtension,
  isFolder: entity.isFolder,
  isInTrash: entity.isInTrash!,
  lastViewedAt: entity.lastViewedAt!,
  createdAt: entity.createdAt!,
  updatedAt: entity.updatedAt!,
});
