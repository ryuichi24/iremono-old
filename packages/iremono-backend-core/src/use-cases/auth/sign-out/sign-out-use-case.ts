import { TokenService } from '../../../services';
import { ISignOutUseCase, SignOutRequestDTO, SignOutResponseDTO } from './contracts';

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
