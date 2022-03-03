export interface RefreshTokenResponseDTO {
  accessToken: { value: string; expiresIn: string };
  refreshToken: { value: string; expiresIn: string };
}
