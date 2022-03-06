import { StorageItem } from '../../../entities';
import { makeStorageItemDTO } from '../../../models';
import { StorageItemRepository } from '../../../repositories';
import { UseCase } from '../../../shared/use-case-lib';
import { InvalidRequestError } from '../../../shared/utils/errors';
import { CreateRootFolderRequestDTO } from './create-root-folder-request-DTO';
import { CreateRootFolderResponseDTO } from './create-root-folder-response-DTO';

export class CreateRootFolderUseCase implements UseCase<CreateRootFolderRequestDTO, CreateRootFolderResponseDTO> {
  private readonly _storageItemRepository: StorageItemRepository;

  constructor(storageItemRepository: StorageItemRepository) {
    this._storageItemRepository = storageItemRepository;
  }

  public async handle(dto: CreateRootFolderRequestDTO): Promise<CreateRootFolderResponseDTO> {
    const alreadyExists =
      dto.folderType === 'crypto'
        ? !!(await this._storageItemRepository.findCryptoRootFolderByOwnerId(dto.ownerId))
        : !!(await this._storageItemRepository.findRootFolderByOwnerId(dto.ownerId));

    if (alreadyExists) throw new InvalidRequestError('root folder for the user already exists.');

    const folder = new StorageItem({
      name: dto.name,
      isFolder: true,
      ownerId: dto.ownerId,
      parentId: null,
      isRootFolder: true,
      isCryptoFolderItem: dto.folderType === 'crypto',
    });

    const saved = await this._storageItemRepository.save(folder);

    return makeStorageItemDTO(saved);
  }
}
