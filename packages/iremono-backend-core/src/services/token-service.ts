interface AccessToken {
  value: string;
  expiresIn: string;
}
interface RefreshToken {
  value: string;
  expiresIn: string;
}

export interface TokenService {
  generateAccessToken(payload: { [key: string]: string }): AccessToken;
  verifyAccessTokenToken(token: string): any;
  generateRefreshToken(userId: string): RefreshToken;
  verifyRefreshToken(token: string): string | null;
}
