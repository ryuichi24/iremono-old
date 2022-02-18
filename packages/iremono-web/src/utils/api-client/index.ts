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
    return response;
  },
  async (err: AxiosError) => {
    const { config, response } = err;

    if (response?.status !== 401) return err;

    if (config.url === refreshTokenEndpoint) return err;

    const refreshToken = tokenManager.refreshToken.get();
    if (!refreshToken) return err;

    const res = await retryAxios.post(refreshTokenEndpoint, { refreshToken });
    const result = res.data;

    tokenManager.accessToken.set(result.accessToken);
    tokenManager.refreshToken.set(result.refreshToken);

    return await apiClient(config);
  },
);

apiClient.interceptors.request.use((request) => {
  const accessToken = tokenManager.accessToken.get();
  if (!request.headers) throw new Error('request headers do not exist.');

  request.headers.Authorization = accessToken || '';

  return request;
});
