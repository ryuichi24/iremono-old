import { makeStorageItemDTO } from '../../../models';
import { StorageItemRepository } from '../../../repositories';
import { UseCase } from '../../../shared/use-case-lib';
import { ListItemsInFolderRequestDTO } from './list-items-in-folder-request-DTO';
import { ListItemsInFolderResponseDTO } from './list-items-in-folder-response-DTO';

export class ListItemsInFolderUseCase implements UseCase<ListItemsInFolderRequestDTO, ListItemsInFolderResponseDTO> {
  private readonly _storageItemRepository: StorageItemRepository;

  constructor(storageItemRepository: StorageItemRepository) {
    this._storageItemRepository = storageItemRepository;
  }

  public async handle(dto: ListItemsInFolderRequestDTO): Promise<ListItemsInFolderResponseDTO> {
    const parentFolder = await this._storageItemRepository.findOneById(dto.id, dto.ownerId);
    if (!parentFolder) throw new Error('the parent folder does not exist.');

    const items = await this._storageItemRepository.findByParentId(dto.id, dto.ownerId, false);

    return {
      entries: items.map((item) => makeStorageItemDTO(item)),
    };
  }
}
