import jwt from 'jsonwebtoken';
import { TokenService } from '../../services';

interface JwtOptions {
  jwtSecretForAccessToken: string;
  jwtExpiresInForAccessToken: string;
}

export const constructJwtService = (jwtOptions: JwtOptions): TokenService =>
  Object.freeze({
    generateAccessToken: (payload: { [key: string]: string }) => {
      const accessTokenString = jwt.sign(payload, jwtOptions.jwtSecretForAccessToken, {
        expiresIn: jwtOptions.jwtExpiresInForAccessToken,
      });

      return {
        value: accessTokenString,
        expiresIn: jwtOptions.jwtExpiresInForAccessToken,
      };
    },
    verifyAccessTokenToken: (token: string) => {
      return jwt.verify(token, jwtOptions.jwtSecretForAccessToken);
    },
  });
