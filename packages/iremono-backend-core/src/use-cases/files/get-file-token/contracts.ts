import { UseCase } from '../../../shared/use-case-lib/interfaces';

export interface GetFileTokenRequestDTO {
  id: string;
  ownerId: string;
  tokenType: string;
  clientEncryptionKey?: string;
}

export interface GetFileTokenResponseDTO {
  fileToken: { value: string; expiresIn: string };
  tokenType: string;
}

export interface IGetFileTokenUseCase extends UseCase<GetFileTokenRequestDTO, GetFileTokenResponseDTO> {}
