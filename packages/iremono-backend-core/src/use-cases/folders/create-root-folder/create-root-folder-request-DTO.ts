export interface CreateRootFolderRequestDTO {
  name: string;
  ownerId: string;
  folderType: 'normal' | 'crypto';
  clientEncryptionKey?: string;
}
