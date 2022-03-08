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

interface CreateRootFolderRequest {
  encryptionKey?: string;
  folderType: 'normal' | 'crypto';
}

const createRootFolder = async (request: CreateRootFolderRequest) => {
  const res = await apiClient.post(`${BASE_URL}/root?type=${request.folderType}`, {
    encryptionKey: request.encryptionKey,
    name: 'Crypto folder',
  });
  const result = res.data;
  return result;
};

interface VerifyClientEncryptionKeyRequest {
  encryptionKey?: string;
}

const verifyClientEncryptionKey = async (request: VerifyClientEncryptionKeyRequest) => {
  const res = await apiClient.post(`${BASE_URL}/root/verify-key`, {
    encryptionKey: request.encryptionKey,
  });
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

interface ListAllAncestorsRequest {
  folderId: string;
}
const listAllAncestors = async (request: ListAllAncestorsRequest) => {
  const res = await apiClient.get(`${BASE_URL}/${request.folderId}/ancestors`);
  const result = res.data;
  return result;
};

interface GetFolderRequest {
  folderId: string;
  folderType?: 'crypto' | 'normal';
}

const get = async (request: GetFolderRequest) => {
  const res = await apiClient.get(`${BASE_URL}/${request.folderId}?type=${request.folderType || 'normal'}`);
  const result = res.data;
  return result;
};

export const foldersService = Object.freeze({
  create,
  createRootFolder,
  update,
  remove,
  restore,
  listItems,
  listAllAncestors,
  get,
  verifyClientEncryptionKey,
});
