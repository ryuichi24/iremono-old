import { UserRepository } from '../../../repositories';
import { CryptoService } from '../../../services/crypto-service';
import { UseCase } from '../../../shared/use-case-lib';
import { RegisterEncryptionKeyRequestDTO } from './register-encryption-key-request-DTO';
import { RegisterEncryptionKeyResponseDTO } from './register-encryption-key-response-DTO';

export class RegisterEncryptionKeyUseCase
  implements UseCase<RegisterEncryptionKeyRequestDTO, RegisterEncryptionKeyResponseDTO>
{
  private readonly _userRepository: UserRepository;
  private readonly _cryptoService: CryptoService;

  constructor(UserRepository: UserRepository, cryptoService: CryptoService) {
    this._userRepository = UserRepository;
    this._cryptoService = cryptoService;
  }

  public async handle(dto: RegisterEncryptionKeyRequestDTO): Promise<RegisterEncryptionKeyResponseDTO> {
    const user = await this._userRepository.findOneById(dto.userId);
    if (!user) throw new Error('the user is not found.');

    const encryptionKeyInitializationVector = this._cryptoService.generateInitializeVector();
    const encryptedClientEncryptionKey = this._cryptoService.encryptInCBC(
      dto.encryptionKey,
      'jsvh384ho23010i0j9dd3h',
      encryptionKeyInitializationVector,
    );

    user.updateEncryptionKeyInitializationVector(encryptionKeyInitializationVector);

    await this._userRepository.save(user);

    return {
      encryptedClientEncryptionKey,
    };
  }
}
