import { StorageItemRepository } from '../../../repositories';
import { HashService } from '../../../services';
import { UseCase } from '../../../shared/use-case-lib';
import { InvalidRequestError, NotExistError } from '../../../shared/utils/errors';
import { VerifyClientEncryptionKeyRequestDTO } from './verify-client-encryption-key-request-DTO';
import { VerifyClientEncryptionKeyResponseDTO } from './verify-client-encryption-key-response-DTO';

export class VerifyClientEncryptionKeyUseCase
  implements UseCase<VerifyClientEncryptionKeyRequestDTO, VerifyClientEncryptionKeyResponseDTO>
{
  private readonly _storageItemRepository: StorageItemRepository;
  private readonly _hashService: HashService;

  constructor(storageItemRepository: StorageItemRepository, hashService: HashService) {
    this._storageItemRepository = storageItemRepository;
    this._hashService = hashService;
  }

  public async handle(dto: VerifyClientEncryptionKeyRequestDTO): Promise<VerifyClientEncryptionKeyResponseDTO> {
    const cryptoRootFolder = await this._storageItemRepository.findCryptoRootFolderByOwnerId(dto.ownerId);
    if (!cryptoRootFolder) throw new NotExistError('Crypto root folder for the user does not exist.');

    const isKeyValid = await this._hashService.compare(dto.clientEncryptionKey, cryptoRootFolder.clientEncryptionKeyHash!);
    if (!isKeyValid) throw new InvalidRequestError('Invalid client encryption key is provided.');

    return {};
  }
}
