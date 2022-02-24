import { makeStorageItemDTO } from '../../../models';
import { StorageItemRepository } from '../../../repositories';
import { UseCase } from '../../../shared/use-case-lib';
import { NotExistError } from '../../../shared/utils/errors';
import { DeleteAllInTrashRequestDTO } from './delete-all-in-trash-request-DTO';
import { DeleteAllInTrashResponseDTO } from './delete-all-in-trash-response-DTO';

export class DeleteAllInTrashUseCase implements UseCase<DeleteAllInTrashRequestDTO, DeleteAllInTrashResponseDTO> {
  private readonly _storageItemRepository: StorageItemRepository;

  constructor(storageItemRepository: StorageItemRepository) {
    this._storageItemRepository = storageItemRepository;
  }

  public async handle(dto: DeleteAllInTrashRequestDTO): Promise<DeleteAllInTrashResponseDTO> {
    const rootFolder = await this._storageItemRepository.findRootFolderByOwnerId(dto.ownerId);
    if (!rootFolder) throw new NotExistError('The root folder does not exists.');

    const trashItems = await this._storageItemRepository.findAllDescendantsById(rootFolder.id, true);
    await Promise.all(trashItems.map(async (trashItem) => await this._storageItemRepository.remove(trashItem)));

    return {
      deletedFiles: trashItems
        .filter((trashItem) => !trashItem.isFolder)
        .map((trashItem) => makeStorageItemDTO(trashItem)),
    };
  }
}
