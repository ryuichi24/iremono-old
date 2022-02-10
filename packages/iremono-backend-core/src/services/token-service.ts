interface AccessToken {
  value: string;
  expiresIn: string;
}

export interface TokenService {
  generateAccessToken(payload: { [key: string]: string }): AccessToken;
  verifyToken(token: string): any;
}
