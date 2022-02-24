import { StorageItemRepository } from '../../../repositories';
import { UseCase } from '../../../shared/use-case-lib';
import { InvalidRequestError } from '../../../shared/utils/errors';
import { RemoveFolderRequestDTO } from './remove-folder-request-DTO';
import { RemoveFolderResponseDTO } from './remove-folder-response-DTO';

export class RemoveFolderUseCase implements UseCase<RemoveFolderRequestDTO, RemoveFolderResponseDTO> {
  private readonly _storageItemRepository: StorageItemRepository;

  constructor(storageItemRepository: StorageItemRepository) {
    this._storageItemRepository = storageItemRepository;
  }

  public async handle(dto: RemoveFolderRequestDTO): Promise<RemoveFolderResponseDTO> {
    const folderToRemove = await this._storageItemRepository.findOneById(dto.id);
    if (!folderToRemove || !folderToRemove.isFolder) throw new InvalidRequestError('the folder does not exist.');

    if (folderToRemove.isRootFolder) throw new InvalidRequestError('the root folder cannot be removed.');

    if (folderToRemove.ownerId !== dto.ownerId)
      throw new InvalidRequestError(`the owner does not match the folder's owner`);

    const allDescendants = await this._storageItemRepository.findAllDescendantsById(folderToRemove.id, dto.ownerId, false);

    await Promise.all(
      allDescendants.map(async (descendant) => {
        descendant.remove();
        await this._storageItemRepository.save(descendant);
      }),
    );

    folderToRemove.remove();
    await this._storageItemRepository.save(folderToRemove);

    return {};
  }
}
