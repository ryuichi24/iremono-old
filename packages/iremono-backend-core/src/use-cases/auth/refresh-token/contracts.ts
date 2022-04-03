import { UseCase } from '../../../shared/use-case-lib/interfaces';

export interface RefreshTokenRequestDTO {
  refreshToken: string;
}

export interface RefreshTokenResponseDTO {
  accessToken: { value: string; expiresIn: string };
  refreshToken: { value: string; expiresIn: string };
}

export interface IRefreshTokenUseCase extends UseCase<RefreshTokenRequestDTO, RefreshTokenResponseDTO> {}
