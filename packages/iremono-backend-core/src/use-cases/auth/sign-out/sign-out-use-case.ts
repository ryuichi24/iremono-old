import { IRefreshTokenService } from '../../../services';
import { ISignOutUseCase, SignOutRequestDTO, SignOutResponseDTO } from './contracts';

export class SignOutUseCase implements ISignOutUseCase {
  constructor(private readonly _refreshTokenService: IRefreshTokenService) {}

  public async handle(dto: SignOutRequestDTO): Promise<SignOutResponseDTO> {
    this._refreshTokenService.revoke(dto.refreshToken);
    return {};
  }
}
