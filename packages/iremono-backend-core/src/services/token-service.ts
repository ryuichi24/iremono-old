interface Token {
  value: string;
  expiresIn: string;
}

interface AccessToken extends Token {}
interface RefreshToken extends Token {}
interface DownloadFileToken extends Token {}
interface StreamFileToken extends Token {}

export interface DownloadFileTokenPayload {
  fileId: string;
  clientEncryptionKey?: string;
}

export interface StreamFileTokenTokenPayload {
  fileId: string;
  clientEncryptionKey?: string;
}

export interface TokenService {
  generateAccessToken(payload: { [key: string]: string }): AccessToken;
  verifyAccessTokenToken(token: string): any;
  generateRefreshToken(userId: string): RefreshToken;
  verifyRefreshToken(token: string): string | null;
  revokeRefreshToken(token: string): void;
  generateDownloadFileToken(payload: DownloadFileTokenPayload): DownloadFileToken;
  verifyDownloadFileToken(token: string): DownloadFileTokenPayload | null;
  revokeDownloadFileToken(token: string): void;
  generateStreamFileToken(payload: StreamFileTokenTokenPayload): StreamFileToken;
  verifyStreamFileToken(token: string): StreamFileTokenTokenPayload | null;
}
