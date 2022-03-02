import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { TokenService } from '../../services';

let refreshTokens: { [key: string]: string }[] = [];

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
      refreshTokens.push({ [token]: userId });
      return {
        value: token,
        expiresIn: tokenOptions.expiresInForRefreshToken,
      };
    },
    verifyRefreshToken: (token: string) => {
      const issuedToken = refreshTokens.find((refreshToken) => Object.keys(refreshToken)[0] === token);
      if (!issuedToken) return null;
      const userId = issuedToken[token];
      refreshTokens = refreshTokens.filter((refreshToken) => !(Object.keys(refreshToken)[0] === token));
      return userId;
    },
  });
