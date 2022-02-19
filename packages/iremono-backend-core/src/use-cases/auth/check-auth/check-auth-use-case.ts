import { makeUserDTO } from '../../../models';
import { UserRepository } from '../../../repositories';
import { UseCase } from '../../../shared/use-case-lib';
import { AuthError } from '../../../shared/utils/errors';
import { CheckAuthRequestDTO } from './check-auth-request-DTO';
import { CheckAuthResponseDTO } from './check-auth-response-DTO';

export class CheckAuthUseCase implements UseCase<CheckAuthRequestDTO, CheckAuthResponseDTO> {
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
