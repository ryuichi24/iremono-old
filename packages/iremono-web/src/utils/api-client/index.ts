import axios, { AxiosError } from 'axios';
import { tokenManager } from '../token-manager';

const refreshTokenEndpoint = '/api/auth/refresh-token';

export const apiClient = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
});

const retryAxios = axios.create({ baseURL: process.env.API_URL, withCredentials: true });

apiClient.interceptors.response.use(
  (response) => {
    const { accessToken } = response.data;

    if (accessToken) tokenManager.accessToken.set(accessToken.value, accessToken.expiresIn);

    return response;
  },
  async (err: AxiosError) => {
    const { config, response } = err;

    if (response?.status !== 401) throw err;

    if (config.url === refreshTokenEndpoint) throw err;

    const res = await retryAxios.post(refreshTokenEndpoint);
    const { accessToken } = res.data;

    if (accessToken) tokenManager.accessToken.set(accessToken.value, accessToken.expiresIn);

    return await apiClient(config);
  },
);

apiClient.interceptors.request.use((request) => {
  const accessToken = tokenManager.accessToken.get();
  if (request.headers && accessToken) request.headers.Authorization = `Bearer ${accessToken}`;

  return request;
});
