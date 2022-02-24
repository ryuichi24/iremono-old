import { makeStorageItemDTO } from '../../../models';
import { StorageItemRepository } from '../../../repositories';
import { UseCase } from '../../../shared/use-case-lib';
import { NotExistError } from '../../../shared/utils/errors';
import { GetRootFolderRequestDTO } from './get-root-folder-request-DTO';
import { GetRootFolderResponseDTO } from './get-root-folder-response-DTO';

export class GetRootFolderUseCase implements UseCase<GetRootFolderRequestDTO, GetRootFolderResponseDTO> {
  private readonly _storageItemRepository: StorageItemRepository;

  constructor(storageItemRepository: StorageItemRepository) {
    this._storageItemRepository = storageItemRepository;
  }

  public async handle(dto: GetRootFolderRequestDTO): Promise<GetRootFolderResponseDTO> {
    const rootFolder = await this._storageItemRepository.findRootFolderByOwnerId(dto.ownerId);
    if (!rootFolder) throw new NotExistError('Root folder for the user does not exists.');
    return makeStorageItemDTO(rootFolder);
  }
}
