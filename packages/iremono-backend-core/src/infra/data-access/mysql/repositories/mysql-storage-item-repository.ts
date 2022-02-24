import { StorageItem } from '../../../../entities';
import { StorageItemRepository } from '../../../../repositories';
import { MysqlRepository } from './mysql-repository';

export class MysqlStorageItemRepository extends MysqlRepository<StorageItem> implements StorageItemRepository {
  async remove(entity: StorageItem): Promise<void> {
    const query = 'DELETE FROM storage_items WHERE id = ? AND owner_id = ?;';
    const values = [entity.id, entity.ownerId];
    await this._query(query, values);
  }

  async findByParentId(parentId: string, ownerId: string, inTrash: boolean): Promise<StorageItem[]> {
    throw new Error('Method not implemented.');
  }

  async findAllDescendantsById(id: string, ownerId: string, inTrash: boolean): Promise<StorageItem[]> {
    throw new Error('Method not implemented.');
  }

  public async findOneById(id: string): Promise<StorageItem | null> {
    const query = 'SELECT * FROM storage_items WHERE id = ?;';
    const values = [id];
    const result = await this._query(query, values);
    const storageItem = (result[0] as any)[0];
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

    await this._query(query, values);

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

    await this._query(query, values);

    return entity;
  }

  protected _toEntity(raw: any): StorageItem {
    return new StorageItem(
      {
        name: raw.name,
        isFolder: raw.is_folder,
        ownerId: raw.owner_id,
        parentId: raw.parent_id,
        filePath: raw.file_path,
        mimeType: raw.mime_type,
        fileSize: raw.file_size,
        fileExtension: raw.file_extension,
        isInTrash: raw.is_in_trash,
        lastViewedAt: raw.last_viewed_at,
        initializationVector: raw.initialization_vector,
        isRootFolder: raw.is_root_folder,
        isEncryptedWithClientKey: raw.is_encrypted_with_client_key,
        hasThumbnail: raw.has_thumbnail,
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
