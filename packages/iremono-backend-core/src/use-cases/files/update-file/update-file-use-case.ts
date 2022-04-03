import { makeStorageItemDTO } from '../../../models';
import { StorageItemRepository } from '../../../repositories';
import { InvalidRequestError, NotExistError } from '../../../shared/utils/errors';
import { IUpdateFileUseCase, UpdateFileRequestDTO, UpdateFileResponseDTO } from './contracts';

export class UpdateFileUseCase implements IUpdateFileUseCase {
  private readonly _storageItemRepository: StorageItemRepository;

  constructor(storageItemRepository: StorageItemRepository) {
    this._storageItemRepository = storageItemRepository;
  }

  public async handle(dto: UpdateFileRequestDTO): Promise<UpdateFileResponseDTO> {
    const fileToUpdate = await this._storageItemRepository.findOneById(dto.id);

    if (!fileToUpdate || fileToUpdate.isFolder) throw new NotExistError('the file does not exist.');

    if (fileToUpdate.isInTrash) throw new InvalidRequestError('the file is in a trash.');

    if (fileToUpdate.ownerId !== dto.ownerId)
      throw new InvalidRequestError(`the owner does not match the folder's owner`);

    if (dto.name) fileToUpdate.rename(dto.name);

    if (dto.parentId) {
      const parentExists = !!(await this._storageItemRepository.findOneById(dto.parentId));
      if (!parentExists) throw new InvalidRequestError('the new parent folder does not exist.');
      fileToUpdate.move(dto.parentId);
    }

    const saved = await this._storageItemRepository.save(fileToUpdate);

    return makeStorageItemDTO(saved);
  }
}
