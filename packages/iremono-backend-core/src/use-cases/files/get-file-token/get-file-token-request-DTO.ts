export interface GetFileTokenRequestDTO {
  id: string;
  ownerId: string;
  tokenType: string;
  clientEncryptionKey?: string;
}
