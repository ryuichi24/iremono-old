import { StorageItemRepository } from '../../../repositories';
import { InvalidRequestError } from '../../../shared/utils/errors';
import { IRemoveFolderUseCase, RemoveFolderRequestDTO, RemoveFolderResponseDTO } from './contracts';

export class RemoveFolderUseCase implements IRemoveFolderUseCase {
  constructor(private readonly _storageItemRepository: StorageItemRepository) {}

  public async handle(dto: RemoveFolderRequestDTO): Promise<RemoveFolderResponseDTO> {
    const folderToRemove = await this._storageItemRepository.findOneById(dto.id);

    if (!folderToRemove || !folderToRemove.isFolder) throw new InvalidRequestError('the folder does not exist.');

    if (folderToRemove.isRootFolder) throw new InvalidRequestError('the root folder cannot be removed.');

    if (folderToRemove.ownerId !== dto.ownerId)
      throw new InvalidRequestError(`the owner does not match the folder's owner`);

    const allDescendants = await this._storageItemRepository.findAllDescendantsById(folderToRemove.id, false);

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
