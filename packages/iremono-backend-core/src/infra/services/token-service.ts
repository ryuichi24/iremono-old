import { Cache } from '@iremono/util';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { TokenService } from '../../services';

const refreshTokenCache = new Cache();

interface TokenOptions {
  jwtSecretForAccessToken: string;
  jwtExpiresInForAccessToken: string;
  expiresInForRefreshToken: string;
}

export const constructTokenService = (tokenOptions: TokenOptions): TokenService =>
  Object.freeze({
    generateAccessToken: (payload: { [key: string]: string }) => {
      const accessTokenString = jwt.sign(payload, tokenOptions.jwtSecretForAccessToken, {
        expiresIn: tokenOptions.jwtExpiresInForAccessToken,
      });
      return {
        value: accessTokenString,
        expiresIn: tokenOptions.jwtExpiresInForAccessToken,
      };
    },
    verifyAccessTokenToken: (token: string) => {
      return jwt.verify(token, tokenOptions.jwtSecretForAccessToken);
    },
    generateRefreshToken: (userId: string) => {
      const token = crypto.randomBytes(40).toString('hex');
      refreshTokenCache.set(token, userId, tokenOptions.expiresInForRefreshToken);
      return {
        value: token,
        expiresIn: tokenOptions.expiresInForRefreshToken,
      };
    },
    verifyRefreshToken: (token: string) => {
      const userId = refreshTokenCache.get(token);
      if (!userId) return null;
      refreshTokenCache.delete(token);
      return userId;
    },
  });
