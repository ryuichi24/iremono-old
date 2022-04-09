import crypto from 'crypto';
import { Cache } from '@iremono/util/dist/cache';
import { IRefreshTokenService, TokenOutput } from '../../services/token-service';

interface TokenOptions {
  expiresIn: string | number;
  tokenSize: number;
}

export class RefreshTokenTokenService implements IRefreshTokenService {
  constructor(
    private readonly _cache: Cache,
    private readonly _tokenOptions: TokenOptions = { expiresIn: 86400000, tokenSize: 40 },
  ) {}

  public generate(payload: string): TokenOutput {
    const token = crypto.randomBytes(40).toString('hex');
    this._cache.set(token, payload, this._tokenOptions.expiresIn);
    return {
      value: token,
      expiresIn: this._tokenOptions.expiresIn.toString(),
    };
  }

  public verify(token: string): string | null {
    const payload = this._cache.get(token);
    if (!payload) return null;
    this._cache.delete(token);
    return payload;
  }

  public revoke(token: string): void {
    this._cache.delete(token);
  }
}
