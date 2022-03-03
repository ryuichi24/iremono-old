interface Token {
  value: string;
  expiresIn: string;
}

interface AccessToken extends Token {}
interface RefreshToken extends Token {}
interface DownloadFileToken extends Token {}

export interface TokenService {
  generateAccessToken(payload: { [key: string]: string }): AccessToken;
  verifyAccessTokenToken(token: string): any;
  generateRefreshToken(userId: string): RefreshToken;
  verifyRefreshToken(token: string): string | null;
  revokeRefreshToken(token: string): void;
  generateDownloadFileToken(fileId: string): DownloadFileToken;
  verifyDownloadFileToken(token: string): string | null;
}
