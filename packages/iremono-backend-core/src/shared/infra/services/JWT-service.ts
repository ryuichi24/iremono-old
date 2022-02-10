import jwt from 'jsonwebtoken';
import { TokenService } from '../../../services';

interface JwtOptions {
  jwtSecret: string;
  jwtExpiresIn: string;
}

export const constructJwtService = (jwtOptions: JwtOptions): TokenService =>
  Object.freeze({
    generateAccessToken: (payload: { [key: string]: string }) => {
      const accessTokenString = jwt.sign(payload, jwtOptions.jwtSecret, {
        expiresIn: jwtOptions.jwtExpiresIn,
      });

      return {
        value: accessTokenString,
        expiresIn: jwtOptions.jwtExpiresIn,
      };
    },
    verifyToken: (token: string, secret: string) => {
      return jwt.verify(token, secret);
    },
  });
