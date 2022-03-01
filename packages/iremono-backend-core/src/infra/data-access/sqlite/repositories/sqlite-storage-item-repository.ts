import { StorageItem } from '../../../../entities';
import { StorageItemRepository } from '../../../../repositories';
import { SqliteRepository } from './sqlite-repository';

export class MysqlStorageItemRepository extends SqliteRepository<StorageItem> implements StorageItemRepository {
  public async remove(entity: StorageItem): Promise<void> {
    const query = 'DELETE FROM storage_items WHERE id = ? AND owner_id = ?;';
    const values = [entity.id, entity.ownerId];
    await this._writeQuery(query, values);
  }

  public async findByParentId(parentId: string, inTrash: boolean): Promise<StorageItem[]> {
    const query = 'SELECT * FROM storage_items WHERE parent_id = ? AND is_in_trash = ?;';
    const values = [parentId, inTrash];
    const storageItems = await this._readQuery(query, values);
    return storageItems.map((item: any) => this._toEntity(item));
  }

  public async findAllDescendantsById(id: string, inTrash: boolean): Promise<StorageItem[]> {
    const query = `WITH RECURSIVE descendants (
        id, name, parent_id, is_folder, is_in_trash, 
        file_path, file_size, last_viewed_at, initialization_vector, is_encrypted_with_client_key,
        has_thumbnail, thumbnail_path, thumbnail_size, thumbnail_initialization_vector, created_at, 
        updated_at, owner_id
      ) 
      AS 
      (
      SELECT     id, name, parent_id, is_folder, is_in_trash,
                 file_path, file_size, last_viewed_at, initialization_vector, is_encrypted_with_client_key,
                 has_thumbnail, thumbnail_path, thumbnail_size, thumbnail_initialization_vector, created_at, 
                 updated_at, owner_id
      FROM       storage_items
      WHERE      parent_id = ?

      UNION ALL

      SELECT     si.id, si.name, si.parent_id, si.is_folder, si.is_in_trash,
                 si.file_path, si.file_size, si.last_viewed_at, si.initialization_vector, si.is_encrypted_with_client_key,
                 si.has_thumbnail, si.thumbnail_path, si.thumbnail_size, si.thumbnail_initialization_vector, si.created_at, 
                 si.updated_at, si.owner_id

      FROM       storage_items si
      INNER JOIN descendants
              ON si.parent_id = descendants.id
    )
    SELECT * FROM descendants WHERE is_in_trash = ?
    `;
    const values = [id, inTrash];

    const storageItems = await this._readQuery(query, values);
    return storageItems.map((item) => this._toEntity(item));
  }

  public async findAllAncestorsById(id: string): Promise<StorageItem[]> {
    const query = `WITH RECURSIVE ancestors (
        id, name, parent_id, is_folder, is_in_trash, 
        file_path, file_size, last_viewed_at, initialization_vector, is_encrypted_with_client_key,
        has_thumbnail, thumbnail_path, thumbnail_size, thumbnail_initialization_vector, created_at, 
        updated_at, owner_id
      ) 
      AS 
      (
      SELECT     id, name, parent_id, is_folder, is_in_trash,
                 file_path, file_size, last_viewed_at, initialization_vector, is_encrypted_with_client_key,
                 has_thumbnail, thumbnail_path, thumbnail_size, thumbnail_initialization_vector, created_at, 
                 updated_at, owner_id
      FROM       storage_items
      WHERE      id = ?

      UNION ALL

      SELECT     si.id, si.name, si.parent_id, si.is_folder, si.is_in_trash,
                 si.file_path, si.file_size, si.last_viewed_at, si.initialization_vector, si.is_encrypted_with_client_key,
                 si.has_thumbnail, si.thumbnail_path, si.thumbnail_size, si.thumbnail_initialization_vector, si.created_at, 
                 si.updated_at, si.owner_id

      FROM       storage_items si
      INNER JOIN ancestors
              ON si.id = ancestors.parent_id
    )
    SELECT * FROM ancestors WHERE id != ?
    `;
    const values = [id, id];

    const storageItems = await this._readQuery(query, values);
    return storageItems.map((item) => this._toEntity(item));
  }

  public async findRootFolderByOwnerId(ownerId: string): Promise<StorageItem | null> {
    const query = 'SELECT * FROM storage_items WHERE owner_id = ? AND is_root_folder = 1;';
    const values = [ownerId];
    const storageItem = await this._readOneQuery(query, values);
    if (!storageItem) return null;
    return this._toEntity(storageItem);
  }

  public async findOneById(id: string): Promise<StorageItem | null> {
    const query = 'SELECT * FROM storage_items WHERE id = ?;';
    const values = [id];
    const storageItem = await this._readOneQuery(query, values);
    if (!storageItem) return null;
    return this._toEntity(storageItem);
  }

  protected async _insert(entity: StorageItem): Promise<StorageItem | null> {
    const query = `INSERT INTO storage_items
                   (id, name, parent_id, owner_id, file_path,
                    file_size, mime_type, file_extension, is_folder, is_in_trash,
                    last_viewed_at, initialization_vector, is_root_folder, is_encrypted_with_client_key, has_thumbnail,
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
      entity.isEncryptedWithClientKey,
      entity.hasThumbnail,
      entity.thumbnailPath,
      entity.thumbnailSize,
      entity.thumbnailInitializationVector,
      entity.createdAt,
      entity.updatedAt,
    ];

    await this._writeQuery(query, values);

    return entity;
  }

  protected async _update(entity: StorageItem): Promise<StorageItem | null> {
    const query = `UPDATE storage_items 
                   SET
                   name = ?, parent_id = ?, file_path = ?, file_size = ?, is_in_trash = ?,
                   last_viewed_at = ?, initialization_vector = ?, is_encrypted_with_client_key = ?, has_thumbnail = ?, thumbnail_path = ?,
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
      entity.isEncryptedWithClientKey,
      entity.hasThumbnail,
      entity.thumbnailPath,
      entity.thumbnailSize,
      entity.thumbnailInitializationVector,
      entity.createdAt,
      entity.updatedAt,
      entity.id,
    ];

    await this._writeQuery(query, values);

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
        isEncryptedWithClientKey: Boolean(raw.is_encrypted_with_client_key),
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