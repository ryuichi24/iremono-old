import { StorageItem } from '../../../entities';
import { makeStorageItemDTO } from '../../../models';
import { StorageItemRepository } from '../../../repositories';
import { InvalidRequestError } from '../../../shared/utils/errors';
import { isRootFolder } from '../../../shared/utils/is-rootr-folder';
import { CreateFolderRequestDTO, CreateFolderResponseDTO, ICreateFolderUseCase } from './contracts';

export class CreateFolderUseCase implements ICreateFolderUseCase {
  private readonly _storageItemRepository: StorageItemRepository;

  constructor(storageItemRepository: StorageItemRepository) {
    this._storageItemRepository = storageItemRepository;
  }

  public async handle(dto: CreateFolderRequestDTO): Promise<CreateFolderResponseDTO> {
    let parentFolder;

    if (isRootFolder(dto.parentId)) {
      parentFolder = await this._storageItemRepository.findRootFolderByOwnerId(dto.ownerId);
    }

    if (!isRootFolder(dto.parentId)) {
      parentFolder = await this._storageItemRepository.findOneById(dto.parentId);
    }

    if (!parentFolder) throw new InvalidRequestError('the parent folder does not exist.');

    if (parentFolder.ownerId !== dto.ownerId)
      throw new InvalidRequestError(`the owner does not match the folder's owner`);

    if (parentFolder.isInTrash) throw new InvalidRequestError('the parent folder is in a trash.');

    const folder = new StorageItem({
      name: dto.name,
      isFolder: true,
      ownerId: dto.ownerId,
      parentId: parentFolder.id,
      isCryptoFolderItem: parentFolder.isCryptoFolderItem,
    });

    const saved = await this._storageItemRepository.save(folder);

    return makeStorageItemDTO(saved);
  }
}
