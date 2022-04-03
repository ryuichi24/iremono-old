import { UseCase } from '../../../shared/use-case-lib/interfaces';

export interface VerifyClientEncryptionKeyRequestDTO {
  ownerId: string;
  clientEncryptionKey: string;
}

export interface VerifyClientEncryptionKeyResponseDTO {}

export interface IVerifyClientEncryptionKeyUseCase
  extends UseCase<VerifyClientEncryptionKeyRequestDTO, VerifyClientEncryptionKeyResponseDTO> {}
