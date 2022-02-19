import { StorageItemRepository } from '../../../repositories';
import { UseCase } from '../../../shared/use-case-lib';
import { NotExistError } from '../../../shared/utils/errors';
import { RemoveFileRequestDTO } from './remove-file-request-DTO';
import { RemoveFileResponseDTO } from './remove-file-response-DTO';

export class RemoveFileUseCase implements UseCase<RemoveFileRequestDTO, RemoveFileResponseDTO> {
  private readonly _storageItemRepository: StorageItemRepository;

  constructor(storageItemRepository: StorageItemRepository) {
    this._storageItemRepository = storageItemRepository;
  }

  public async handle(dto: RemoveFileRequestDTO): Promise<RemoveFileResponseDTO> {
    const fileToRemove = await this._storageItemRepository.findOneById(dto.id, dto.ownerId);
    if (!fileToRemove || fileToRemove.isFolder) throw new NotExistError('the file does not exist.');

    fileToRemove.remove();
    await this._storageItemRepository.save(fileToRemove);

    return {};
  }
}
