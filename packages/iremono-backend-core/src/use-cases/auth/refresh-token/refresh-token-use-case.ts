import { IAccessTokenService, IRefreshTokenService } from '../../../services';
import { AuthError } from '../../../shared/utils/errors';
import { IRefreshTokenUseCase, RefreshTokenRequestDTO, RefreshTokenResponseDTO } from './contracts';

export class RefreshTokenUseCase implements IRefreshTokenUseCase {
  constructor(
    private readonly _accessTokenService: IAccessTokenService,
    private readonly _refreshTokenService: IRefreshTokenService,
  ) {}

  public async handle(dto: RefreshTokenRequestDTO): Promise<RefreshTokenResponseDTO> {
    const userId = this._refreshTokenService.verify(dto.refreshToken);
    if (!userId) throw new AuthError(`refresh token is invalid.`);

    const accessToken = this._accessTokenService.generate({ id: userId });
    const refreshToken = this._refreshTokenService.generate(userId);

    return {
      accessToken,
      refreshToken,
    };
  }
}
