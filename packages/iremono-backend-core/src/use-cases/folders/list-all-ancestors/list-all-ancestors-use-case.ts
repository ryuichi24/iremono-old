import { makeStorageItemDTO } from '../../../models';
import { StorageItemRepository } from '../../../repositories';
import { UseCase } from '../../../shared/use-case-lib';
import { InvalidRequestError, NotExistError } from '../../../shared/utils/errors';
import { ListAllAncestorsRequestDTO } from './list-all-ancestors-request-DTO';
import { ListAllAncestorsResponseDTO } from './list-all-ancestors-response-DTO';

export class ListAllAncestorsUseCase implements UseCase<ListAllAncestorsRequestDTO, ListAllAncestorsResponseDTO> {
  private readonly _storageItemRepository: StorageItemRepository;

  constructor(storageItemRepository: StorageItemRepository) {
    this._storageItemRepository = storageItemRepository;
  }

  public async handle(dto: ListAllAncestorsRequestDTO): Promise<ListAllAncestorsResponseDTO> {
    const folder = await this._storageItemRepository.findOneById(dto.id);

    if (!folder) {
      throw new NotExistError('The folder does not exist.');
    }

    if (folder.ownerId !== dto.ownerId) {
      throw new InvalidRequestError(`The owner does not match the folder's owner`);
    }

    const items = await this._storageItemRepository.findAllAncestorsById(folder.id);

    return {
      entries: items.map((item) => makeStorageItemDTO(item)),
    };
  }
}
