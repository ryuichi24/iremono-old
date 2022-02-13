import { StorageItemRepository } from '../../../repositories';
import { UseCase } from '../../../shared/use-case-lib';
import { RemoveFolderRequestDTO } from './remove-folder-request-DTO';
import { RemoveFolderResponseDTO } from './remove-folder-response-DTO';

export class RemoveFolderUseCase implements UseCase<RemoveFolderRequestDTO, RemoveFolderResponseDTO> {
  private readonly _storageItemRepository: StorageItemRepository;

  constructor(storageItemRepository: StorageItemRepository) {
    this._storageItemRepository = storageItemRepository;
  }

  public async handle(dto: RemoveFolderRequestDTO): Promise<RemoveFolderResponseDTO> {
    const folderToRemove = await this._storageItemRepository.findOneById(dto.id, dto.ownerId);
    if (!folderToRemove || !folderToRemove.isFolder) throw new Error('the folder does not exist.');

    const allDescendants = await this._storageItemRepository.findAllDescendantsById(dto.id, dto.ownerId, false);

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
