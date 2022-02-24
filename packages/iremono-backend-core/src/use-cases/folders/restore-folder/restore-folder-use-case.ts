import { StorageItemRepository } from '../../../repositories';
import { UseCase } from '../../../shared/use-case-lib';
import { InvalidRequestError } from '../../../shared/utils/errors';
import { isRootFolder } from '../../../shared/utils/is-rootr-folder';
import { RestoreFolderRequestDTO } from './restore-folder-request-DTO';
import { RestoreFolderResponseDTO } from './restore-folder-response-DTO';

export class RestoreFolderUseCase implements UseCase<RestoreFolderRequestDTO, RestoreFolderResponseDTO> {
  private readonly _storageItemRepository: StorageItemRepository;

  constructor(storageItemRepository: StorageItemRepository) {
    this._storageItemRepository = storageItemRepository;
  }

  public async handle(dto: RestoreFolderRequestDTO): Promise<RestoreFolderResponseDTO> {
    const folderToRestore = await this._storageItemRepository.findOneById(dto.id);

    if (!folderToRestore || !folderToRestore.isFolder) throw new InvalidRequestError('the folder does not exist.');

    const parentFolder = await this._storageItemRepository.findOneById(folderToRestore.parentId!);
    if (parentFolder?.isInTrash) throw new InvalidRequestError('the parent folder is in a trash.');

    if (folderToRestore.ownerId !== dto.ownerId)
      throw new InvalidRequestError(`the owner does not match the folder's owner`);

    const allDescendants = await this._storageItemRepository.findAllDescendantsById(
      folderToRestore.id,
      dto.ownerId,
      true,
    );

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
