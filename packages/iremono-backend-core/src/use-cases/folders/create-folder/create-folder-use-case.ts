import { StorageItem } from '../../../entities';
import { makeStorageItemDTO } from '../../../models';
import { StorageItemRepository } from '../../../repositories';
import { UseCase } from '../../../shared/use-case-lib';
import { InvalidRequestError } from '../../../shared/utils/errors';
import { CreateFolderRequestDTO } from './create-folder-request-DTO';
import { CreateFolderResponseDTO } from './create-folder-response-DTO';

export class CreateFolderUseCase implements UseCase<CreateFolderRequestDTO, CreateFolderResponseDTO> {
  private readonly _storageItemRepository: StorageItemRepository;

  constructor(storageItemRepository: StorageItemRepository) {
    this._storageItemRepository = storageItemRepository;
  }

  public async handle(dto: CreateFolderRequestDTO): Promise<CreateFolderResponseDTO> {
    const parentFolder = await this._storageItemRepository.findOneById(dto.parentId, dto.ownerId);

    if (!parentFolder) throw new InvalidRequestError('the parent folder does not exist.');

    if (parentFolder.isInTrash) throw new InvalidRequestError('the parent folder is in a trash.');

    const folder = new StorageItem({
      name: dto.name,
      isFolder: true,
      ownerId: dto.ownerId,
      parentId: dto.parentId,
    });

    const saved = await this._storageItemRepository.save(folder);

    return makeStorageItemDTO(saved);
  }
}
