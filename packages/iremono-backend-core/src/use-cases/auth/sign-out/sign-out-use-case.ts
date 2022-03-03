import { TokenService } from '../../../services';
import { UseCase } from '../../../shared/use-case-lib';
import { SignOutResponseDTO } from './sign-out-response-DTO';
import { SignOutRequestDTO } from './sign-out-request-DTO';

export class SignOutUseCase implements UseCase<SignOutRequestDTO, SignOutResponseDTO> {
  private readonly _tokenService: TokenService;

  constructor(tokenService: TokenService) {
    this._tokenService = tokenService;
  }

  public async handle(dto: SignOutRequestDTO): Promise<SignOutResponseDTO> {
    this._tokenService.revokeRefreshToken(dto.refreshToken);
    return {};
  }
}
