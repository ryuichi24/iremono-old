import { config } from '../../../config';
import { Cookie } from '../../controller-lib';

const makeAccessTokenCookie = (accessToken: string, maxAge: string | number): Cookie => ({
  key: 'accessToken',
  value: accessToken,
  options: {
    httpOnly: true,
    maxAge: typeof maxAge === 'number' ? maxAge : parseInt(maxAge),
    sameSite: 'strict',
    secure: config.serverConfig.SECURE_COOKIE,
    path: '/api',
  },
});

const makeRefreshTokenCookie = (refreshToken: string, maxAge: string | number): Cookie => ({
  key: 'refreshToken',
  value: refreshToken,
  options: {
    httpOnly: true,
    maxAge: typeof maxAge === 'number' ? maxAge : parseInt(maxAge),
    sameSite: 'strict',
    secure: config.serverConfig.SECURE_COOKIE,
    path: '/api/auth/refresh-token',
  },
});

const makeRefreshTokenCookieForSignOut = (refreshToken: string, maxAge: string | number): Cookie => ({
  key: 'refreshToken',
  value: refreshToken,
  options: {
    httpOnly: true,
    maxAge: typeof maxAge === 'number' ? maxAge : parseInt(maxAge),
    sameSite: 'strict',
    secure: config.serverConfig.SECURE_COOKIE,
    path: '/api/auth/signout',
  },
});

const makeRefreshTokenExpiredCookie = (): Cookie => ({
  key: 'refreshToken',
  value: '',
  options: {
    httpOnly: true,
    maxAge: 0,
    sameSite: 'strict',
    secure: config.serverConfig.SECURE_COOKIE,
    path: '/api/auth/refresh-token',
  },
});

const makeRefreshTokenExpiredCookieForSignOut = (): Cookie => ({
  key: 'refreshToken',
  value: 'refreshToken',
  options: {
    httpOnly: true,
    maxAge: 0,
    sameSite: 'strict',
    secure: config.serverConfig.SECURE_COOKIE,
    path: '/api/auth/signout',
  },
});

export const cookieHelper = Object.freeze({
  makeAccessTokenCookie,
  makeRefreshTokenCookie,
  makeRefreshTokenCookieForSignOut,
  makeRefreshTokenExpiredCookie,
  makeRefreshTokenExpiredCookieForSignOut,
});
