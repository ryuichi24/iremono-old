import { UseCase } from '../../../shared/use-case-lib/interfaces';
import { CheckAuthRequestDTO } from './check-auth-request-DTO';
import { CheckAuthResponseDTO } from './check-auth-response-DTO';

export interface ICheckAuthUseCase extends UseCase<CheckAuthRequestDTO, CheckAuthResponseDTO> {}
