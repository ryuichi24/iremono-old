import { makeUserDTO } from '../../../models';
import { UserRepository } from '../../../repositories';
import { AuthError } from '../../../shared/utils/errors';
import { CheckAuthRequestDTO, CheckAuthResponseDTO, ICheckAuthUseCase } from './contracts';

export class CheckAuthUseCase implements ICheckAuthUseCase {
  constructor(private readonly _userRepository: UserRepository) {}

  public async handle(dto: CheckAuthRequestDTO): Promise<CheckAuthResponseDTO> {
    const User = await this._userRepository.findOneById(dto.id);
    if (!User) throw new AuthError(`invalid User id: ${dto.id}`);

    return makeUserDTO(User);
  }
}
