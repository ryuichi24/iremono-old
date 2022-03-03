export interface GetFileTokenResponseDTO {
  fileToken: { value: string; expiresIn: string };
  tokenType: string;
}
