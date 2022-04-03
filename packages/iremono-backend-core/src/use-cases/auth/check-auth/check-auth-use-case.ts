import { makeUserDTO } from '../../../models';
import { UserRepository } from '../../../repositories';
import { AuthError } from '../../../shared/utils/errors';
import { CheckAuthRequestDTO } from './check-auth-request-DTO';
import { CheckAuthResponseDTO } from './check-auth-response-DTO';
import { ICheckAuthUseCase } from './i-check-auth-use-case';

export class CheckAuthUseCase implements ICheckAuthUseCase {
  private readonly _userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  public async handle(dto: CheckAuthRequestDTO): Promise<CheckAuthResponseDTO> {
    const User = await this._userRepository.findOneById(dto.id);
    if (!User) throw new AuthError(`invalid User id: ${dto.id}`);

    return makeUserDTO(User);
  }
}
