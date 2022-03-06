export interface GetFolderRequestDTO {
  id: string;
  ownerId: string;
  folderType: 'normal' | 'crypto';
}
