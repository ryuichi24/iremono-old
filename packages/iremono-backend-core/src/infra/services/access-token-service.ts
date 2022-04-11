import jwt from 'jsonwebtoken';
import { IAccessTokenService, TokenOutput } from '../../services';

interface TokenOptions {
  secretKey: string;
  expiresIn: string | number;
}

export class AccessTokenService implements IAccessTokenService {
  constructor(private readonly _tokenOptions: TokenOptions) {}

  public generate(payload: { [key: string]: string }): TokenOutput {
    const accessTokenString = jwt.sign(payload, this._tokenOptions.secretKey, {
      expiresIn: this._tokenOptions.expiresIn,
    });

    return {
      value: accessTokenString,
      expiresIn: this._tokenOptions.expiresIn.toString(),
    };
  }

  public verify(token: string): { [key: string]: string } | null {
    return jwt.verify(token, this._tokenOptions.secretKey) as any;
  }
}
