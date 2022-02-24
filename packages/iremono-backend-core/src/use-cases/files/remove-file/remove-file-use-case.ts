import { StorageItemRepository } from '../../../repositories';
import { UseCase } from '../../../shared/use-case-lib';
import { InvalidRequestError, NotExistError } from '../../../shared/utils/errors';
import { RemoveFileRequestDTO } from './remove-file-request-DTO';
import { RemoveFileResponseDTO } from './remove-file-response-DTO';

export class RemoveFileUseCase implements UseCase<RemoveFileRequestDTO, RemoveFileResponseDTO> {
  private readonly _storageItemRepository: StorageItemRepository;

  constructor(storageItemRepository: StorageItemRepository) {
    this._storageItemRepository = storageItemRepository;
  }

  public async handle(dto: RemoveFileRequestDTO): Promise<RemoveFileResponseDTO> {
    const fileToRemove = await this._storageItemRepository.findOneById(dto.id);
    if (!fileToRemove || fileToRemove.isFolder) throw new NotExistError('the file does not exist.');

    if (fileToRemove.ownerId !== dto.ownerId)
      throw new InvalidRequestError(`the owner does not match the folder's owner`);

    fileToRemove.remove();
    await this._storageItemRepository.save(fileToRemove);

    return {};
  }
}
