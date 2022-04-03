import { makeStorageItemDTO } from '../../../models';
import { StorageItemRepository } from '../../../repositories';
import { InvalidRequestError, NotExistError } from '../../../shared/utils/errors';
import { isRootFolder } from '../../../shared/utils/is-rootr-folder';
import { GetFolderRequestDTO, GetFolderResponseDTO, IGetFolderUseCase } from './contracts';

export class GetFolderUseCase implements IGetFolderUseCase {
  private readonly _storageItemRepository: StorageItemRepository;

  constructor(storageItemRepository: StorageItemRepository) {
    this._storageItemRepository = storageItemRepository;
  }

  public async handle(dto: GetFolderRequestDTO): Promise<GetFolderResponseDTO> {
    let folder;

    if (isRootFolder(dto.id)) {
      folder =
        dto.folderType === 'crypto'
          ? await this._storageItemRepository.findCryptoRootFolderByOwnerId(dto.ownerId)
          : await this._storageItemRepository.findRootFolderByOwnerId(dto.ownerId);
    }

    if (!isRootFolder(dto.id)) {
      folder = await this._storageItemRepository.findOneById(dto.id);
    }

    if (!folder) throw new NotExistError('the folder for the user does not exists.');

    if (folder.ownerId !== dto.ownerId) throw new InvalidRequestError(`the owner does not match the folder's owner`);

    return makeStorageItemDTO(folder);
  }
}
