import { Entity, EntityProps } from '../shared';

interface Props extends EntityProps {
  name: string;
  parentId: string | null;
  ownerId: string;
  filePath?: string;
  fileSize?: number;
  mimeType?: string;
  fileExtension?: string;
  isFolder: boolean;
  isInTrash?: boolean;
  isRootFolder?: boolean;
  initializationVector?: string;
  thumbnailPath?: string;
  thumbnailSize?: number;
  thumbnailInitializationVector?: string;
  lastViewedAt?: Date;
}

export class StorageItem extends Entity<Props> {
  public constructor(props: Props, id?: string) {
    const isNew = id === undefined;
    super({ ...props, isRootFolder: props.isRootFolder || false, isInTrash: isNew ? false : props.isInTrash }, id);

    if (isNew) {
      //
    }
  }

  public rename(newName: string) {
    this._props.name = newName;
    this._props.updatedAt = new Date();
  }

  public move(newParent: string) {
    this._props.parentId = newParent;
    this._props.updatedAt = new Date();
  }

  public remove() {
    this._props.isInTrash = true;
    this._props.updatedAt = new Date();
  }

  public restore() {
    this._props.isInTrash = false;
    this._props.updatedAt = new Date();
  }

  public view() {
    this._props.lastViewedAt = new Date();
  }

  get name() {
    return this._props.name;
  }

  get parentId() {
    return this._props.parentId;
  }

  get ownerId() {
    return this._props.ownerId;
  }

  get filePath() {
    return this._props.filePath;
  }

  get fileSize() {
    return this._props.fileSize;
  }

  get initializationVector() {
    return this._props.initializationVector;
  }

  get mimeType() {
    return this._props.mimeType;
  }

  get fileExtension() {
    if (this._props.fileExtension) return this._props.fileExtension;

    const name = this._props.name;
    const indexOfExtension = name.lastIndexOf('.');
    const hasExtension = indexOfExtension > 0;
    return hasExtension ? name.slice(indexOfExtension + 1) : undefined;
  }

  get isFolder() {
    return this._props.isFolder;
  }

  get isInTrash() {
    return this._props.isInTrash;
  }

  get isRootFolder() {
    return this._props.isRootFolder;
  }

  get lastViewedAt() {
    return this._props.lastViewedAt;
  }

  get thumbnailPath() {
    return this._props.thumbnailPath;
  }

  get thumbnailSize() {
    return this._props.thumbnailSize;
  }

  get thumbnailInitializationVector() {
    return this._props.thumbnailInitializationVector;
  }
}
