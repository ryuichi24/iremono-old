import { TokenService } from '../../../services';
import { AuthError } from '../../../shared/utils/errors';
import { IRefreshTokenUseCase, RefreshTokenRequestDTO, RefreshTokenResponseDTO } from './contracts';

export class RefreshTokenUseCase implements IRefreshTokenUseCase {
  private readonly _tokenService: TokenService;

  constructor(tokenService: TokenService) {
    this._tokenService = tokenService;
  }

  public async handle(dto: RefreshTokenRequestDTO): Promise<RefreshTokenResponseDTO> {
    const userId = this._tokenService.verifyRefreshToken(dto.refreshToken);
    if (!userId) throw new AuthError(`refresh token is invalid.`);

    const accessToken = this._tokenService.generateAccessToken({ id: userId });
    const refreshToken = this._tokenService.generateRefreshToken(userId);

    return {
      accessToken,
      refreshToken,
    };
  }
}
