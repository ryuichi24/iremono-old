import { LoggerFactory } from '@iremono/util/dist/logger';
import { StorageItem } from '../../../../entities';
import { StorageItemRepository } from '../../../../repositories';

interface StorageItemRow {
  id: string;
  name: string;
  parentId: string;
  ancestors: (string | null)[];
  ownerId: string;
  filePath?: string;
  fileSize?: number;
  mimeType?: string;
  fileExtension?: string;
  isFolder: boolean;
  isInTrash: boolean;
  lastViewedAt: Date;
  initializationVector: string;
  isRootFolder: boolean;
  isEncryptedWithClientKey: boolean;
  hasThumbnail: boolean;
  thumbnailPath?: string;
  thumbnailSize?: number;
  thumbnailInitializationVector?: string;
  createdAt: Date;
  updatedAt: Date;
}

const storageItemTable: StorageItemRow[] = [];

export const constructMockStorageItemRepository = (loggerFactory: LoggerFactory): StorageItemRepository => {
  const logger = loggerFactory.createLogger('MockStorageItemRepository');

  const _insert = async (entity: StorageItem) => {
    const parentFolder = storageItemTable.find((item) => item.id === entity.parentId);
    const ancestors = parentFolder ? [...parentFolder.ancestors, entity.parentId] : [];
    const itemRow = makeStorageItemRowFromEntity(entity, ancestors);
    storageItemTable.push(itemRow);
  };

  const _update = (entity: StorageItem) => {
    const parentFolder = storageItemTable.find((item) => item.id === entity.parentId);
    const indexOfEntity = storageItemTable.findIndex((item) => item.id === entity.id);
    const itemRowToUpdate = storageItemTable.splice(indexOfEntity, 1)[0];
    const ancestors = parentFolder ? [...parentFolder.ancestors, entity.parentId] : [];

    itemRowToUpdate.id = entity.id!;
    itemRowToUpdate.name = entity.name;
    itemRowToUpdate.parentId = entity.parentId!;
    itemRowToUpdate.ancestors = ancestors;
    itemRowToUpdate.ownerId = entity.ownerId;
    itemRowToUpdate.filePath = entity.filePath;
    itemRowToUpdate.fileSize = entity.fileSize;
    itemRowToUpdate.mimeType = entity.mimeType;
    itemRowToUpdate.fileExtension = entity.fileExtension;
    itemRowToUpdate.isFolder = entity.isFolder;
    itemRowToUpdate.isInTrash = entity.isInTrash!;
    itemRowToUpdate.isEncryptedWithClientKey = entity.isEncryptedWithClientKey!;
    itemRowToUpdate.isRootFolder = entity.isRootFolder!;
    itemRowToUpdate.lastViewedAt = entity.lastViewedAt!;
    itemRowToUpdate.thumbnailPath = entity.thumbnailPath;
    itemRowToUpdate.thumbnailSize = entity.thumbnailSize;
    itemRowToUpdate.thumbnailInitializationVector = entity.thumbnailInitializationVector;
    itemRowToUpdate.createdAt = entity.createdAt!;
    itemRowToUpdate.updatedAt = entity.updatedAt!;

    storageItemTable.push(itemRowToUpdate);
  };

  const save = async (entity: StorageItem) => {
    const entityExists = !!(await findOneById(entity.id, entity.ownerId));

    if (!entityExists) await _insert(entity);
    if (entityExists) await _update(entity);

    logger.debug(
      `a storage item has been saved.`,
      `[storage-item-memory-table="${JSON.stringify(storageItemTable, null, '\t')}"]`,
    );

    return entity;
  };

  const remove = async (entity: StorageItem) => {
    const indexOfEntity = storageItemTable.findIndex((item) => item.id === entity.id);
    storageItemTable.splice(indexOfEntity, 1)[0];

    logger.debug(
      `a storage item has been removed.`,
      `[storage-item-memory-table="${JSON.stringify(storageItemTable, null, '\t')}"]`,
    );
  };

  const findOneById = async (id: string, ownerId: string) => {
    const foundItemRow = storageItemTable.find((item) => item.id === id && item.ownerId === ownerId);
    if (!foundItemRow) return null;

    return makeStorageItemEntityFromRow(foundItemRow);
  };

  const findByParentId = async (parentId: string, ownerId: string, inTrash: boolean) => {
    const foundItemRows = storageItemTable.filter(
      (itemRow) =>
        itemRow.parentId === parentId &&
        itemRow.ownerId === ownerId &&
        (inTrash ? itemRow.isInTrash : !itemRow.isInTrash),
    );
    return foundItemRows.map((itemRow) => makeStorageItemEntityFromRow(itemRow));
  };

  const findAllDescendantsById = async (id: string, ownerId: string, inTrash: boolean) => {
    const descendants = storageItemTable.filter(
      (itemRow) =>
        itemRow.ancestors.includes(id) &&
        itemRow.ownerId === ownerId &&
        (inTrash ? itemRow.isInTrash : !itemRow.isInTrash),
    );
    return descendants.map((descendant) => makeStorageItemEntityFromRow(descendant));
  };

  return {
    save,
    remove,
    findOneById,
    findByParentId,
    findAllDescendantsById,
  };
};

const makeStorageItemEntityFromRow = (row: StorageItemRow): StorageItem =>
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
      initializationVector: row.initializationVector,
      isRootFolder: row.isRootFolder,
      isEncryptedWithClientKey: row.isEncryptedWithClientKey,
      hasThumbnail: row.hasThumbnail,
      thumbnailPath: row.thumbnailPath,
      thumbnailSize: row.thumbnailSize,
      thumbnailInitializationVector: row.thumbnailInitializationVector,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    },
    row.id,
  );

const makeStorageItemRowFromEntity = (entity: StorageItem, ancestors: (string | null)[]): StorageItemRow => ({
  id: entity.id!,
  name: entity.name,
  parentId: entity.parentId!,
  ancestors: ancestors,
  ownerId: entity.ownerId,
  filePath: entity.filePath,
  fileSize: entity.fileSize,
  mimeType: entity.mimeType,
  fileExtension: entity.fileExtension,
  isFolder: entity.isFolder,
  isInTrash: entity.isInTrash!,
  lastViewedAt: entity.lastViewedAt!,
  initializationVector: entity.initializationVector!,
  isRootFolder: entity.isRootFolder!,
  isEncryptedWithClientKey: entity.isEncryptedWithClientKey!,
  hasThumbnail: entity.hasThumbnail,
  thumbnailPath: entity.thumbnailPath,
  thumbnailSize: entity.thumbnailSize,
  thumbnailInitializationVector: entity.thumbnailInitializationVector,
  createdAt: entity.createdAt!,
  updatedAt: entity.updatedAt!,
});
