import { makeStorageItemDTO } from '../../../models';
import { StorageItemRepository } from '../../../repositories';
import { UseCase } from '../../../shared/use-case-lib';
import { InvalidRequestError } from '../../../shared/utils/errors';
import { DeleteFileInTrashRequestDTO } from './delete-file-in-trash-request-DTO';
import { DeleteFileInTrashResponseDTO } from './delete-file-in-trash-response-DTO';

export class DeleteFileInTrashUseCase implements UseCase<DeleteFileInTrashRequestDTO, DeleteFileInTrashResponseDTO> {
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
