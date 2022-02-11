import { StorageItemRepository } from '../../../repositories';
import { UseCase } from '../../../shared/use-case-lib';
import { RestoreFolderRequestDTO } from './restore-folder-request-DTO';
import { RestoreFolderResponseDTO } from './restore-folder-response-DTO';

export class RestoreFolderUseCase implements UseCase<RestoreFolderRequestDTO, RestoreFolderResponseDTO> {
  private readonly _storageItemRepository: StorageItemRepository;

  constructor(storageItemRepository: StorageItemRepository) {
    this._storageItemRepository = storageItemRepository;
  }

  public async handle(dto: RestoreFolderRequestDTO): Promise<RestoreFolderResponseDTO> {
    const folderToRestore = await this._storageItemRepository.findOneById(dto.id, dto.ownerId);
    if (!folderToRestore) throw new Error('the folder does not exist.');

    const allDescendants = await this._storageItemRepository.findAllDescendantsById(dto.id, dto.ownerId, true);

    await Promise.all(
      allDescendants.map(async (descendant) => {
        descendant.restore();
        await this._storageItemRepository.save(descendant);
      }),
    );

    folderToRestore.restore();
    await this._storageItemRepository.save(folderToRestore);

    return {};
  }
}
