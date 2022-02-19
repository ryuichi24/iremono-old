import { UserRepository } from '../../../repositories';
import { UseCase } from '../../../shared/use-case-lib';
import { InvalidRequestError } from '../../../shared/utils/errors';
import { RegisterEncryptionKeyRequestDTO } from './register-encryption-key-request-DTO';
import { RegisterEncryptionKeyResponseDTO } from './register-encryption-key-response-DTO';

export class RegisterEncryptionKeyUseCase
  implements UseCase<RegisterEncryptionKeyRequestDTO, RegisterEncryptionKeyResponseDTO>
{
  private readonly _userRepository: UserRepository;

  constructor(UserRepository: UserRepository) {
    this._userRepository = UserRepository;
  }

  public async handle(dto: RegisterEncryptionKeyRequestDTO): Promise<RegisterEncryptionKeyResponseDTO> {
    const user = await this._userRepository.findOneById(dto.userId);
    if (!user) throw new InvalidRequestError('the user is not found.');

    user.updateEncryptionKeyInitializationVector(dto.encryptionKeyInitializationVector);

    await this._userRepository.save(user);

    return {};
  }
}
