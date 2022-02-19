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
    const { accessToken, refreshToken } = response.data;

    if (accessToken) tokenManager.accessToken.set(accessToken);
    if (refreshToken) tokenManager.refreshToken.set(refreshToken);

    return response;
  },
  async (err: AxiosError) => {
    const { config, response } = err;

    if (response?.status !== 401) throw err;

    tokenManager.accessToken.remove();

    if (config.url === refreshTokenEndpoint) {
      tokenManager.refreshToken.remove();
      throw err;
    }

    const refreshToken = tokenManager.refreshToken.get();
    if (!refreshToken) throw err;

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

  if (accessToken) request.headers.Authorization = `Bearer ${accessToken}`;

  return request;
});
