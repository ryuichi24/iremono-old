import { UseCase } from '../../../shared/use-case-lib/interfaces';

export interface StreamVideoRequestDTO {
  id: string;
  streamFileToken: string;
}

export interface StreamVideoResponseDTO {
  name: string;
  mimeType: string;
  fileSize: number;
  filePath: string;
  fileInitializationVector: string;
  clientEncryptionKey?: string;
}

export interface IStreamVideoUseCase extends UseCase<StreamVideoRequestDTO, StreamVideoResponseDTO> {}
