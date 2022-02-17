import { UserRepository } from '../../../repositories';
import { HashService, TokenService } from '../../../services';
import { UseCase } from '../../../shared/use-case-lib';
import { SignInResponseDTO } from './sigin-in-response-DTO';
import { SignInRequestDTO } from './sign-in-request-DTO';

export class SignInUseCase implements UseCase<SignInRequestDTO, SignInResponseDTO> {
  private readonly _userRepository: UserRepository;
  private readonly _tokenService: TokenService;
  private readonly _hashService: HashService;

  constructor(userRepository: UserRepository, tokenService: TokenService, hashService: HashService) {
    this._userRepository = userRepository;
    this._tokenService = tokenService;
    this._hashService = hashService;
  }

  public async handle(dto: SignInRequestDTO): Promise<SignInResponseDTO> {
    const user = await this._userRepository.findOneByEmail(dto.email);
    if (!user) throw new Error(`email or password is invalid`);

    const isPasswordValid = await this._hashService.compare(dto.password, user.hashedPassword);
    if (!isPasswordValid) throw new Error(`email or password is invalid`);

    const accessToken = this._tokenService.generateAccessToken({ id: user.id });

    return {
      accessToken: accessToken.value,
      expiresIn: accessToken.expiresIn,
    };
  }
}
