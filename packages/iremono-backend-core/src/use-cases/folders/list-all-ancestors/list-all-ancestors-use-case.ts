import { makeStorageItemDTO } from '../../../models';
import { StorageItemRepository } from '../../../repositories';
import { InvalidRequestError, NotExistError } from '../../../shared/utils/errors';
import { IListAllAncestorsUseCase, ListAllAncestorsRequestDTO, ListAllAncestorsResponseDTO } from './contracts';

export class ListAllAncestorsUseCase implements IListAllAncestorsUseCase {
  constructor(private readonly _storageItemRepository: StorageItemRepository) {}

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
