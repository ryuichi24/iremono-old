import { makeStorageItemDTO } from '../../../models';
import { StorageItemRepository } from '../../../repositories';
import { UseCase } from '../../../shared/use-case-lib';
import { DeleteFileInTrashRequestDTO } from './delete-file-in-trash-request-DTO';
import { DeleteFileInTrashResponseDTO } from './delete-file-in-trash-response-DTO';

export class DeleteFileInTrashUseCase implements UseCase<DeleteFileInTrashRequestDTO, DeleteFileInTrashResponseDTO> {
  private readonly _storageItemRepository: StorageItemRepository;

  constructor(storageItemRepository: StorageItemRepository) {
    this._storageItemRepository = storageItemRepository;
  }

  public async handle(dto: DeleteFileInTrashRequestDTO): Promise<DeleteFileInTrashResponseDTO> {
    const fileToRemove = await this._storageItemRepository.findOneById(dto.id, dto.ownerId);
    if (!fileToRemove) throw new Error('the file does not exist in trash.');

    await this._storageItemRepository.remove(fileToRemove);

    return {
      deletedFile: makeStorageItemDTO(fileToRemove),
    };
  }
}
