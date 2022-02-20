import { apiClient } from '@/utils/api-client';

const BASE_URL = '/api/security';

interface RegisterEncryptionKeyRequest {
  encryptionKey: string;
}

const registerEncryptionKey = async (request: RegisterEncryptionKeyRequest) => {
  const res = await apiClient.patch(`${BASE_URL}/encryption-key`, { encryptionKey: request.encryptionKey });
  const result = res.data;
  return result;
};

export const securityService = Object.freeze({ registerEncryptionKey });
