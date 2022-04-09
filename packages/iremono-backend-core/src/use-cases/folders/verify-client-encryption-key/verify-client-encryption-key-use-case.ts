import { StorageItemRepository } from '../../../repositories';
import { HashService } from '../../../services';
import { InvalidRequestError, NotExistError } from '../../../shared/utils/errors';
import {
  IVerifyClientEncryptionKeyUseCase,
  VerifyClientEncryptionKeyRequestDTO,
  VerifyClientEncryptionKeyResponseDTO,
} from './contracts';

export class VerifyClientEncryptionKeyUseCase implements IVerifyClientEncryptionKeyUseCase {
  constructor(
    private readonly _storageItemRepository: StorageItemRepository,
    private readonly _hashService: HashService,
  ) {}

  public async handle(dto: VerifyClientEncryptionKeyRequestDTO): Promise<VerifyClientEncryptionKeyResponseDTO> {
    const cryptoRootFolder = await this._storageItemRepository.findCryptoRootFolderByOwnerId(dto.ownerId);
    if (!cryptoRootFolder) throw new NotExistError('Crypto root folder for the user does not exist.');

    const isKeyValid = await this._hashService.compare(
      dto.clientEncryptionKey,
      cryptoRootFolder.clientEncryptionKeyHash!,
    );
    if (!isKeyValid) throw new InvalidRequestError('Invalid client encryption key is provided.');

    return {};
  }
}
