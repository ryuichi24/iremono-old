export interface TokenOutput {
  value: string;
  expiresIn: string;
}

export interface FileTokenOutput {
  fileId: string;
  clientEncryptionKey?: string;
}

interface ICanRevokeToken {
  revoke(token: string): void;
}

interface ITempTokenService<TPayload = any, TOutput = any> {
  generate(payload: TPayload): TOutput;
  verify(token: string): TPayload | null;
}

export interface IAccessTokenService extends ITempTokenService<{ [key: string]: string }, TokenOutput> {}

export interface IRefreshTokenService extends ITempTokenService<string, TokenOutput>, ICanRevokeToken {}

export interface IDownloadFileTokenService extends ITempTokenService<FileTokenOutput, TokenOutput>, ICanRevokeToken {}

export interface IStreamFileTokenService extends ITempTokenService<FileTokenOutput, TokenOutput> {}
