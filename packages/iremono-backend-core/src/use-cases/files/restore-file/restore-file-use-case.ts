import { StorageItemRepository } from '../../../repositories';
import { UseCase } from '../../../shared/use-case-lib';
import { InvalidRequestError, NotExistError } from '../../../shared/utils/errors';
import { RestoreFileRequestDTO } from './restore-file-request-DTO';
import { RestoreFileResponseDTO } from './restore-file-response-DTO';

export class RestoreFileUseCase implements UseCase<RestoreFileRequestDTO, RestoreFileResponseDTO> {
  private readonly _storageItemRepository: StorageItemRepository;

  constructor(storageItemRepository: StorageItemRepository) {
    this._storageItemRepository = storageItemRepository;
  }

  public async handle(dto: RestoreFileRequestDTO): Promise<RestoreFileResponseDTO> {
    const fileToRestore = await this._storageItemRepository.findOneById(dto.id);
    if (!fileToRestore || fileToRestore.isFolder) throw new NotExistError('the file does not exist.');

    if (fileToRestore.ownerId !== dto.ownerId)
      throw new InvalidRequestError(`the owner does not match the folder's owner`);

    const parentFolder = await this._storageItemRepository.findOneById(fileToRestore.parentId!);
    if (parentFolder?.isInTrash) throw new InvalidRequestError('the parent folder is in a trash.');

    fileToRestore.restore();
    await this._storageItemRepository.save(fileToRestore);

    return {};
  }
}
