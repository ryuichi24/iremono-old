import { TokenService } from '../../../services';
import { SignOutResponseDTO } from './sign-out-response-DTO';
import { SignOutRequestDTO } from './sign-out-request-DTO';
import { ISignOutUseCase } from './i-sign-out-use-case';

export class SignOutUseCase implements ISignOutUseCase {
  private readonly _tokenService: TokenService;

  constructor(tokenService: TokenService) {
    this._tokenService = tokenService;
  }

  public async handle(dto: SignOutRequestDTO): Promise<SignOutResponseDTO> {
    this._tokenService.revokeRefreshToken(dto.refreshToken);
    return {};
  }
}
