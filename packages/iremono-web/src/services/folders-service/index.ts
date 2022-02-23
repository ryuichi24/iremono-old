import { apiClient } from '@/utils/api-client';

const BASE_URL = '/api/folders';

interface CreateFolderRequest {
  name: string;
  parentId: string;
}

const create = async (request: CreateFolderRequest) => {
  const res = await apiClient.post(`${BASE_URL}`, request);
  const result = res.data;
  return result;
};

interface UpdateFolderRequest {
  folderId: string;
  folderProperties: {
    name?: string;
    parentId?: string;
  };
}

const update = async (request: UpdateFolderRequest) => {
  const res = await apiClient.patch(`${BASE_URL}/${request.folderId}`, { ...request.folderProperties });
  const result = res.data;
  return result;
};

interface RemoveFolderRequest {
  folderId: string;
}

const remove = async (request: RemoveFolderRequest) => {
  const res = await apiClient.post(`${BASE_URL}/${request.folderId}/remove`);
  const result = res.data;
  return result;
};

interface RestoreFolderRequest {
  folderId: string;
}

const restore = async (request: RestoreFolderRequest) => {
  const res = await apiClient.post(`${BASE_URL}/${request.folderId}/restore`);
  const result = res.data;
  return result;
};

interface ListItemsInFolderRequest {
  folderId: string;
}
const listItems = async (request: ListItemsInFolderRequest) => {
  const res = await apiClient.get(`${BASE_URL}/${request.folderId}/items`);
  const result = res.data;
  return result;
};

export const foldersService = Object.freeze({ create, update, remove, restore, listItems });
