import { UseCase } from '../../../shared/use-case-lib/interfaces';
import { RefreshTokenRequestDTO } from './refresh-token-request-DTO';
import { RefreshTokenResponseDTO } from './refresh-token-response-DTO';

export interface IRefreshTokenUseCase extends UseCase<RefreshTokenRequestDTO, RefreshTokenResponseDTO> {}
