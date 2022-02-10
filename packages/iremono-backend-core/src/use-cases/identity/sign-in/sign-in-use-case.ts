import { IdentityRepository } from '../../../repositories';
import { HashService, TokenService } from '../../../services';
import { UseCase } from '../../../shared/use-case-lib';
import { SignInResponseDTO } from './sigin-in-response-DTO';
import { SignInRequestDTO } from './sign-in-request-DTO';

export class SignInUseCase implements UseCase<SignInRequestDTO, SignInResponseDTO> {
  private readonly _identityRepository: IdentityRepository;
  private readonly _tokenService: TokenService;
  private readonly _hashService: HashService;

  constructor(identityRepository: IdentityRepository, tokenService: TokenService, hashService: HashService) {
    this._identityRepository = identityRepository;
    this._tokenService = tokenService;
    this._hashService = hashService;
  }

  public async handle(dto: SignInRequestDTO): Promise<SignInResponseDTO> {
    const identity = await this._identityRepository.findOneByEmail(dto.email);
    if (!identity) throw new Error(`email or password is invalid`);

    const isPasswordValid = await this._hashService.compare(dto.password, identity.hashedPassword);
    if (!isPasswordValid) throw new Error(`email or password is invalid`);

    const accessToken = this._tokenService.generateAccessToken({ id: identity.id });

    return {
      accessToken: accessToken.value,
      expiresIn: accessToken.expiresIn,
    };
  }
}
