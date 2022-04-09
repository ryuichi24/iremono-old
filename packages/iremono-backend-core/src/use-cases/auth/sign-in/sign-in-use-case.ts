import { makeUserDTO } from '../../../models';
import { UserRepository } from '../../../repositories';
import { HashService, IAccessTokenService, IRefreshTokenService } from '../../../services';
import { AuthError } from '../../../shared/utils/errors';
import { ISignInUseCase, SignInRequestDTO, SignInResponseDTO } from './contracts';

export class SignInUseCase implements ISignInUseCase {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _accessTokenService: IAccessTokenService,
    private readonly _refreshTokenService: IRefreshTokenService,
    private readonly _hashService: HashService,
  ) {}

  public async handle(dto: SignInRequestDTO): Promise<SignInResponseDTO> {
    const user = await this._userRepository.findOneByEmail(dto.email);
    if (!user) throw new AuthError(`email or password is invalid`);

    const isPasswordValid = await this._hashService.compare(dto.password, user.hashedPassword);
    if (!isPasswordValid) throw new AuthError(`email or password is invalid`);

    const accessToken = this._accessTokenService.generate({ id: user.id });
    const refreshToken = this._refreshTokenService.generate(user.id);

    return {
      accessToken,
      refreshToken,
      user: makeUserDTO(user),
    };
  }
}
