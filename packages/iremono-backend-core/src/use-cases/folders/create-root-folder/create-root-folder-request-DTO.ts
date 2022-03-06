export interface CreateRootFolderRequestDTO {
  name: string;
  ownerId: string;
  folderType: 'normal' | 'crypto';
}
