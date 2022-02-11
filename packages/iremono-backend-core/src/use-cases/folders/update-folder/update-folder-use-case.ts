import { makeStorageItemDTO } from '../../../models';
import { StorageItemRepository } from '../../../repositories';
import { UseCase } from '../../../shared/use-case-lib';
import { UpdateFolderRequestDTO } from './update-folder-request-DTO';
import { UpdateFolderResponseDTO } from './update-folder-response-DTO';

export class UpdateFolderUseCase implements UseCase<UpdateFolderRequestDTO, UpdateFolderResponseDTO> {
  private readonly _storageItemRepository: StorageItemRepository;

  constructor(storageItemRepository: StorageItemRepository) {
    this._storageItemRepository = storageItemRepository;
  }

  public async handle(dto: UpdateFolderRequestDTO): Promise<UpdateFolderResponseDTO> {
    const folder = await this._storageItemRepository.findOneById(dto.id, dto.ownerId);

    if (!folder) throw new Error('the folder does not exist.');

    if (dto.name) folder.rename(dto.name);

    if (dto.parentId) {
      const parentExists = !!(await this._storageItemRepository.findOneById(dto.parentId, dto.ownerId));
      if (!parentExists) throw new Error('the parent folder does not exist.');
      folder.move(dto.parentId);
    }

    const saved = await this._storageItemRepository.save(folder);

    return makeStorageItemDTO(saved);
  }
}
