import { makeStorageItemDTO } from '../../../models';
import { StorageItemRepository } from '../../../repositories';
import { InvalidRequestError } from '../../../shared/utils/errors';
import { DeleteFileInTrashRequestDTO, DeleteFileInTrashResponseDTO, IDeleteFileInTrashUseCase } from './contracts';

export class DeleteFileInTrashUseCase implements IDeleteFileInTrashUseCase {
  private readonly _storageItemRepository: StorageItemRepository;

  constructor(storageItemRepository: StorageItemRepository) {
    this._storageItemRepository = storageItemRepository;
  }

  public async handle(dto: DeleteFileInTrashRequestDTO): Promise<DeleteFileInTrashResponseDTO> {
    const fileToRemove = await this._storageItemRepository.findOneById(dto.id);
    if (!fileToRemove || fileToRemove.isFolder) throw new InvalidRequestError('the file does not exist in trash.');

    if (fileToRemove.ownerId !== dto.ownerId)
      throw new InvalidRequestError(`the owner does not match the folder's owner`);

    await this._storageItemRepository.remove(fileToRemove);

    return {
      deletedFile: makeStorageItemDTO(fileToRemove),
    };
  }
}
