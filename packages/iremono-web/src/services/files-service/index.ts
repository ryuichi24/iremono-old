import { v4 as uuidv4 } from 'uuid';
import { apiClient } from '@/utils/api-client';
import { AxiosRequestConfig } from 'axios';

const BASE_URL = '/api/files';

interface UploadFileRequest {
  parentId: string;
  fileToUpload: File;
  initUpload: (uploadItemId: string, fileName: string, progress: number) => void;
  onUpload: (uploadItemId: string, progress: number, uploadedSize: number) => void;
  afterUpload: (uploadItemId: string, progress: number) => void;
  encryptionKey?: string;
}

const upload = async (request: UploadFileRequest) => {
  const uploadId = uuidv4();

  const config: AxiosRequestConfig = {
    onUploadProgress: (progressEvent) => {
      const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
      request.onUpload(uploadId, progress, progressEvent.loaded);
    },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const formData = new FormData();
  formData.append('file', request.fileToUpload, request.fileToUpload.name);
  formData.append('fileSize', request.fileToUpload.size.toString());
  formData.append('parentId', request.parentId);
  if (request.encryptionKey) formData.append('encryptionKey', request.encryptionKey);

  request.initUpload(uploadId, request.fileToUpload.name, 0);

  const res = await apiClient.post(`${BASE_URL}/content`, formData, config);

  request.afterUpload(uploadId, 100);

  const result = res.data;
  return result;
};

interface UpdateFileRequest {
  fileId: string;
  fileProperties: {
    name?: string;
    parentId?: string;
  };
}

const update = async (request: UpdateFileRequest) => {
  const res = await apiClient.patch(`${BASE_URL}/${request.fileId}`, { ...request.fileProperties });
  const result = res.data;
  return result;
};

interface RemoveFileRequest {
  fileId: string;
}

const remove = async (request: RemoveFileRequest) => {
  const res = await apiClient.post(`${BASE_URL}/${request.fileId}/remove`);
  const result = res.data;
  return result;
};

interface RestoreFileRequest {
  fileId: string;
}

const restore = async (request: RestoreFileRequest) => {
  const res = await apiClient.post(`${BASE_URL}/${request.fileId}/restore`);
  const result = res.data;
  return result;
};

interface GetFileTokenRequest {
  fileId: string;
  tokenType: 'download' | 'stream';
  encryptionKey?: string;
}

const getFileToken = async (request: GetFileTokenRequest) => {
  const res = await apiClient.post(`${BASE_URL}/${request.fileId}/token?type=${request.tokenType}`, {
    encryptionKey: request.encryptionKey,
  });
  const { fileToken } = res.data;
  return fileToken.value;
};

interface DownloadFileRequest {
  fileId: string;
  fileName: string;
  downloadFileToken: string;
}

const download = (request: DownloadFileRequest) => {
  const link = document.createElement('a');
  document.body.appendChild(link);
  link.href = `${BASE_URL}/${request.fileId}/content?token=${request.downloadFileToken}`;
  link.setAttribute('type', 'hidden');
  link.setAttribute('download', `${request.fileName}`);
  link.click();
  link.parentNode?.removeChild(link);
};

interface DownloadImageFileRequest {
  fileId: string;
  downloadFileToken: string;
}

const downloadImageFile = async (request: DownloadImageFileRequest) => {
  const res = await apiClient.get(`${BASE_URL}/${request.fileId}/content?token=${request.downloadFileToken}`, {
    responseType: 'arraybuffer',
  });
  const result = res.data;
  const imgFileBlob = new Blob([result], { type: res.headers['content-type'] });
  const imgURL = URL.createObjectURL(imgFileBlob);
  return imgURL;
};

interface DownloadFileThumbnailRequest {
  fileId: string;
  encryptionKey?: string;
}

const downloadThumbnail = async (request: DownloadFileThumbnailRequest) => {
  const res = await apiClient.get(`${BASE_URL}/${request.fileId}/thumbnail`, {
    responseType: 'arraybuffer',
    headers: { 'encryption-key': request.encryptionKey || '' },
  });
  const result = res.data;
  const imgFileBlob = new Blob([result], { type: res.headers['content-type'] });
  const imgURL = URL.createObjectURL(imgFileBlob);
  return imgURL;
};

export const filesService = Object.freeze({
  upload,
  update,
  remove,
  restore,
  download,
  getFileToken,
  downloadImageFile,
  downloadThumbnail,
});
