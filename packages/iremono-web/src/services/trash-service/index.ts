import { apiClient } from '@/utils/api-client';

const BASE_URL = '/api/trash';

interface DeleteFolderRequest {
  folderId: string;
}

const deleteFolder = async (request: DeleteFolderRequest) => {
  const res = await apiClient.delete(`${BASE_URL}/folders/${request.folderId}`);
  const result = res.data;
  return result;
};

interface DeleteFileRequest {
  fileId: string;
}

const deleteFile = async (request: DeleteFileRequest) => {
  const res = await apiClient.delete(`${BASE_URL}/files/${request.fileId}`);
  const result = res.data;
  return result;
};

const deleteAll = async () => {
  const res = await apiClient.delete(`${BASE_URL}/items`);
  const result = res.data;
  return result;
};

interface ListItemsRequest {
  folderType: 'normal' | 'crypto';
}

const listItems = async (request: ListItemsRequest) => {
  const res = await apiClient.get(`${BASE_URL}/items?type=${request.folderType}`);
  const result = res.data;
  return result;
};

export const trashService = Object.freeze({ deleteFolder, deleteFile, listItems, deleteAll });
