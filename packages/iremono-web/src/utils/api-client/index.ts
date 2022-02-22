import axios, { AxiosError } from 'axios';

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

    if (response?.status !== 401) throw err;

    if (config.url === refreshTokenEndpoint) throw err;

    await retryAxios.post(refreshTokenEndpoint);

    return await apiClient(config);
  },
);

apiClient.interceptors.request.use((request) => {
  return request;
});
