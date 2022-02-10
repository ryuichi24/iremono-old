import { makeIdentityDTO } from '../../../models';
import { IdentityRepository } from '../../../repositories';
import { UseCase } from '../../../shared/use-case-lib';
import { CheckIdentityRequestDTO } from './check-identity-request-DTO';
import { CheckIdentityResponseDTO } from './check-identity-response-DTO';

export class CheckIdentityUseCase implements UseCase<CheckIdentityRequestDTO, CheckIdentityResponseDTO> {
  private readonly _identityRepository: IdentityRepository;

  constructor(identityRepository: IdentityRepository) {
    this._identityRepository = identityRepository;
  }

  public async handle(dto: CheckIdentityRequestDTO): Promise<CheckIdentityResponseDTO> {
    const identity = await this._identityRepository.findOneById(dto.id);
    if (!identity) throw new Error(`invalid identity id: ${dto.id}`);

    return makeIdentityDTO(identity);
  }
}
