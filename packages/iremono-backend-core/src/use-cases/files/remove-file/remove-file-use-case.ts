import { StorageItemRepository } from '../../../repositories';
import { UseCase } from '../../../shared/use-case-lib';
import { RemoveFileRequestDTO } from './remove-file-request-DTO';
import { RemoveFileResponseDTO } from './remove-file-response-DTO';

export class RemoveFileUseCase implements UseCase<RemoveFileRequestDTO, RemoveFileResponseDTO> {
  private readonly _storageItemRepository: StorageItemRepository;

  constructor(storageItemRepository: StorageItemRepository) {
    this._storageItemRepository = storageItemRepository;
  }

  public async handle(dto: RemoveFileRequestDTO): Promise<RemoveFileResponseDTO> {
    const fileToRemove = await this._storageItemRepository.findOneById(dto.id, dto.ownerId);
    if (!fileToRemove) throw new Error('the file does not exist.');

    fileToRemove.remove();
    await this._storageItemRepository.save(fileToRemove);

    return {};
  }
}
