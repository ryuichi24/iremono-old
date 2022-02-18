const ACCESS_TOKEN = 'access-token';
const REFRESH_TOKEN = 'refresh-token';

const accessToken = Object.freeze({
  get: () => localStorage.getItem(ACCESS_TOKEN),
  set: (token: string) => localStorage.setItem(ACCESS_TOKEN, token),
  remove: () => localStorage.removeItem(ACCESS_TOKEN),
});

const refreshToken = Object.freeze({
  get: () => localStorage.getItem(REFRESH_TOKEN),
  set: (token: string) => localStorage.setItem(REFRESH_TOKEN, token),
  remove: () => localStorage.removeItem(REFRESH_TOKEN),
});

export const tokenManager = Object.freeze({ accessToken, refreshToken });
