import { Cache } from '@iremono/util/dist/cache';

const ACCESS_TOKEN = 'access-token';

const tokenCache = new Cache();

const accessToken = Object.freeze({
  get: () => tokenCache.get(ACCESS_TOKEN),
  set: (token: string, expiresIn: string) => tokenCache.set(ACCESS_TOKEN, token, expiresIn),
  remove: () => tokenCache.delete(ACCESS_TOKEN),
});

export const tokenManager = Object.freeze({ accessToken });
