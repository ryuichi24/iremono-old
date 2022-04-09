import crypto from 'crypto';
import { Cache } from '@iremono/util/dist/cache';
import { FileTokenOutput, IDownloadFileTokenService, TokenOutput } from '../../services';

interface TokenOptions {
  expiresIn: string | number;
  tokenSize: number;
}

export class DownloadFileTokenService implements IDownloadFileTokenService {
  constructor(
    private readonly _cache: Cache,
    private readonly _tokenOptions: TokenOptions = { expiresIn: 86400000, tokenSize: 40 },
  ) {}

  public generate(payload: FileTokenOutput): TokenOutput {
    const token = crypto.randomBytes(this._tokenOptions.tokenSize).toString('hex');
    this._cache.set(token, payload, this._tokenOptions.expiresIn);
    return {
      value: token,
      expiresIn: this._tokenOptions.expiresIn.toString(),
    };
  }

  public verify(token: string): FileTokenOutput | null {
    const payload = this._cache.get(token);
    if (!payload) return null;
    return payload;
  }

  public revoke(token: string): void {
    this._cache.delete(token);
  }
}
