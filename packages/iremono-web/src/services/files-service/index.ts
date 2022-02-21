import { apiClient } from '@/utils/api-client';
import { formatBytes } from '@/utils/format-bytes';
import { AxiosRequestConfig } from 'axios';

const BASE_URL = '/api/files';

interface UploadFileRequest {
  parentId: string;
  fileToUpload: File;
}

const upload = async (request: UploadFileRequest) => {
  const config: AxiosRequestConfig = {
    onUploadProgress: (progressEvent) => {
      const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
      const formattedProgress = formatBytes(progressEvent.loaded);
    },
  };

  const formData = new FormData();
  const arrayBuffer = await request.fileToUpload.arrayBuffer();
  const fileBrob = new Blob([new Uint8Array(arrayBuffer)], {
    type: request.fileToUpload.type,
  });
  formData.append('file', fileBrob, request.fileToUpload.name);
  formData.append('parentId', request.parentId);

  const res = await apiClient.post(`${BASE_URL}/content`, formData, config);
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
  const res = await apiClient.post(`${BASE_URL}/${request}/restore`);
  const result = res.data;
  return result;
};

interface DownloadFileRequest {
  fileId: string;
  fileName: string;
}

const download = (request: DownloadFileRequest) => {
  const link = document.createElement('a');
  document.body.appendChild(link);
  link.href = `${BASE_URL}/${request.fileId}/content`;
  link.setAttribute('type', 'hidden');
  link.setAttribute('download', `${request.fileName}`);
  link.click();
  link.parentNode?.removeChild(link);
};

interface DownloadFileThumbnailRequest {
  fileId: string;
}

const downloadThumbnail = async (request: DownloadFileThumbnailRequest) => {
  const res = await apiClient.get(`${BASE_URL}/${request.fileId}/thumbnail`, { responseType: 'arraybuffer' });
  const result = res.data;
  const imgFileBlob = new Blob([result], { type: res.headers['content-type'] });
  const imgURL = URL.createObjectURL(imgFileBlob);
  return imgURL;
};

export const filesService = Object.freeze({ upload, update, remove, restore, download, downloadThumbnail });
