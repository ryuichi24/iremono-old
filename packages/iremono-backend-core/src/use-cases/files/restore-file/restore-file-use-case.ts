import { StorageItemRepository } from '../../../repositories';
import { UseCase } from '../../../shared/use-case-lib';
import { RestoreFileRequestDTO } from './restore-file-request-DTO';
import { RestoreFileResponseDTO } from './restore-file-response-DTO';

export class RestoreFileUseCase implements UseCase<RestoreFileRequestDTO, RestoreFileResponseDTO> {
  private readonly _storageItemRepository: StorageItemRepository;

  constructor(storageItemRepository: StorageItemRepository) {
    this._storageItemRepository = storageItemRepository;
  }

  public async handle(dto: RestoreFileRequestDTO): Promise<RestoreFileResponseDTO> {
    const fileToRestore = await this._storageItemRepository.findOneById(dto.id, dto.ownerId);
    if (!fileToRestore) throw new Error('the file does not exist.');

    fileToRestore.restore();
    await this._storageItemRepository.save(fileToRestore);

    return {};
  }
}
