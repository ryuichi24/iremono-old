import { StorageItem } from '../../../../entities';
import { StorageItemRepository } from '../../../../repositories';
import { MysqlRepository } from './mysql-repository';

export class MysqlStorageItemRepository extends MysqlRepository<StorageItem> implements StorageItemRepository {
  public async remove(entity: StorageItem): Promise<void> {
    const query = 'DELETE FROM storage_items WHERE id = ? AND owner_id = ?;';
    const values = [entity.id, entity.ownerId];
    await this._query(query, values);
  }

  public async findByParentId(parentId: string, inTrash: boolean): Promise<StorageItem[]> {
    const query = 'SELECT * FROM storage_items WHERE parent_id = ? AND is_in_trash = ?;';
    const values = [parentId, inTrash];
    const result = await this._query(query, values);
    const storageItems = result as any[];
    return storageItems.map((item: any) => this._toEntity(item));
  }

  public async findAllDescendantsById(id: string, inTrash: boolean): Promise<StorageItem[]> {
    const query = `WITH RECURSIVE descendants (
        id, name, parent_id, is_folder, is_in_trash, 
        file_path, file_size, last_viewed_at, initialization_vector, is_crypto_folder_item,
        has_thumbnail, thumbnail_path, thumbnail_size, thumbnail_initialization_vector, created_at, 
        updated_at, owner_id
      ) 
      AS 
      (
      SELECT     id, name, parent_id, is_folder, is_in_trash,
                 file_path, file_size, last_viewed_at, initialization_vector, is_crypto_folder_item,
                 has_thumbnail, thumbnail_path, thumbnail_size, thumbnail_initialization_vector, created_at, 
                 updated_at, owner_id
      FROM       storage_items
      WHERE      parent_id = ?

      UNION ALL

      SELECT     si.id, si.name, si.parent_id, si.is_folder, si.is_in_trash,
                 si.file_path, si.file_size, si.last_viewed_at, si.initialization_vector, si.is_crypto_folder_item,
                 si.has_thumbnail, si.thumbnail_path, si.thumbnail_size, si.thumbnail_initialization_vector, si.created_at, 
                 si.updated_at, si.owner_id

      FROM       storage_items si
      INNER JOIN descendants
              ON si.parent_id = descendants.id
    )
    SELECT * FROM descendants WHERE is_in_trash = ?
    `;
    const values = [id, inTrash];

    const result = await this._query(query, values);
    const storageItems = result as any[];
    return storageItems.map((item) => this._toEntity(item));
  }

  public async findAllAncestorsById(id: string): Promise<StorageItem[]> {
    const query = `WITH RECURSIVE ancestors (
        id, name, parent_id, is_folder, is_in_trash, 
        file_path, file_size, last_viewed_at, initialization_vector, is_crypto_folder_item,
        has_thumbnail, thumbnail_path, thumbnail_size, thumbnail_initialization_vector, created_at, 
        updated_at, owner_id
      ) 
      AS 
      (
      SELECT     id, name, parent_id, is_folder, is_in_trash,
                 file_path, file_size, last_viewed_at, initialization_vector, is_crypto_folder_item,
                 has_thumbnail, thumbnail_path, thumbnail_size, thumbnail_initialization_vector, created_at, 
                 updated_at, owner_id
      FROM       storage_items
      WHERE      id = ?

      UNION ALL

      SELECT     si.id, si.name, si.parent_id, si.is_folder, si.is_in_trash,
                 si.file_path, si.file_size, si.last_viewed_at, si.initialization_vector, si.is_crypto_folder_item,
                 si.has_thumbnail, si.thumbnail_path, si.thumbnail_size, si.thumbnail_initialization_vector, si.created_at, 
                 si.updated_at, si.owner_id

      FROM       storage_items si
      INNER JOIN ancestors
              ON si.id = ancestors.parent_id
    )
    SELECT * FROM ancestors WHERE id != ? ORDER BY created_at ASC;
    `;
    const values = [id, id];

    const result = await this._query(query, values);
    const storageItems = result as any[];
    return storageItems.map((item) => this._toEntity(item));
  }

  public async findRootFolderByOwnerId(ownerId: string): Promise<StorageItem | null> {
    const query = 'SELECT * FROM storage_items WHERE owner_id = ? AND is_root_folder = 1;';
    const values = [ownerId];
    const result = await this._query(query, values);
    const storageItem = (result as any)[0];
    if (!storageItem) return null;
    return this._toEntity(storageItem);
  }

  public async findCryptoRootFolderByOwnerId(ownerId: string): Promise<StorageItem | null> {
    const query =
      'SELECT * FROM storage_items WHERE owner_id = ? AND is_root_folder = 1 AND is_crypto_folder_item = 1;';
    const values = [ownerId];
    const result = await this._query(query, values);
    const storageItem = (result as any)[0];
    if (!storageItem) return null;
    return this._toEntity(storageItem);
  }

  public async findOneById(id: string): Promise<StorageItem | null> {
    const query = 'SELECT * FROM storage_items WHERE id = ?;';
    const values = [id];
    const result = await this._query(query, values);
    const storageItem = (result as any)[0];
    if (!storageItem) return null;
    return this._toEntity(storageItem);
  }

  protected async _insert(entity: StorageItem): Promise<StorageItem | null> {
    const query = `INSERT INTO storage_items
                   (id, name, parent_id, owner_id, file_path,
                    file_size, mime_type, file_extension, is_folder, is_in_trash,
                    last_viewed_at, initialization_vector, is_root_folder, is_crypto_folder_item, client_encryption_key_hash, has_thumbnail,
                    thumbnail_path, thumbnail_size, thumbnail_initialization_vector, created_at, updated_at)
                    VALUES 
                    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    const values = [
      entity.id,
      entity.name,
      entity.parentId,
      entity.ownerId,
      entity.filePath,
      entity.fileSize,
      entity.mimeType,
      entity.fileExtension,
      entity.isFolder,
      entity.isInTrash,
      entity.lastViewedAt,
      entity.initializationVector,
      entity.isRootFolder,
      entity.isCryptoFolderItem,
      entity.clientEncryptionKeyHash,
      entity.hasThumbnail,
      entity.thumbnailPath,
      entity.thumbnailSize,
      entity.thumbnailInitializationVector,
      entity.createdAt,
      entity.updatedAt,
    ];

    await this._query(query, values);

    return entity;
  }

  protected async _update(entity: StorageItem): Promise<StorageItem | null> {
    const query = `UPDATE storage_items 
                   SET
                   name = ?, parent_id = ?, file_path = ?, file_size = ?, is_in_trash = ?,
                   last_viewed_at = ?, initialization_vector = ?, is_crypto_folder_item = ?, client_encryption_key_hash = ?, has_thumbnail = ?, thumbnail_path = ?,
                   thumbnail_size = ?, thumbnail_initialization_vector = ?, created_at = ?, updated_at = ?
                   WHERE 
                   id = ?;`;
    const values = [
      entity.name,
      entity.parentId,
      entity.filePath,
      entity.fileSize,
      entity.isInTrash,
      entity.lastViewedAt,
      entity.initializationVector,
      entity.isCryptoFolderItem,
      entity.clientEncryptionKeyHash,
      entity.hasThumbnail,
      entity.thumbnailPath,
      entity.thumbnailSize,
      entity.thumbnailInitializationVector,
      entity.createdAt,
      entity.updatedAt,
      entity.id,
    ];

    await this._query(query, values);

    return entity;
  }

  protected _toEntity(raw: any): StorageItem {
    return new StorageItem(
      {
        name: raw.name,
        isFolder: Boolean(raw.is_folder),
        ownerId: raw.owner_id,
        parentId: raw.parent_id,
        filePath: raw.file_path,
        mimeType: raw.mime_type,
        fileSize: raw.file_size,
        fileExtension: raw.file_extension,
        isInTrash: Boolean(raw.is_in_trash),
        lastViewedAt: raw.last_viewed_at,
        initializationVector: raw.initialization_vector,
        isRootFolder: Boolean(raw.is_root_folder),
        isCryptoFolderItem: Boolean(raw.is_crypto_folder_item),
        clientEncryptionKey: raw.client_encryption_key_hash,
        hasThumbnail: Boolean(raw.has_thumbnail),
        thumbnailPath: raw.thumbnail_path,
        thumbnailSize: raw.thumbnail_size,
        thumbnailInitializationVector: raw.thumbnail_initialization_vector,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      raw.id,
    );
  }
}
