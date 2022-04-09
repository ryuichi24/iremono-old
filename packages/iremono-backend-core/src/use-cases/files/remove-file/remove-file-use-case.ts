import { StorageItemRepository } from '../../../repositories';
import { InvalidRequestError, NotExistError } from '../../../shared/utils/errors';
import { IRemoveFileUseCase, RemoveFileRequestDTO, RemoveFileResponseDTO } from './contracts';

export class RemoveFileUseCase implements IRemoveFileUseCase {
  constructor(private readonly _storageItemRepository: StorageItemRepository) {}

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
