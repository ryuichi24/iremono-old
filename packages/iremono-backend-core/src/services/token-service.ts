interface AccessToken {
  value: string;
  expiresIn: string;
}

export interface TokenService {
  generateAccessToken(payload: { [key: string]: string }): AccessToken;
  verifyAccessTokenToken(token: string): any;
}
