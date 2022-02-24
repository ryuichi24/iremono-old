import { StorageItemRepository, UserRepository } from '../../../repositories';
import { UseCase } from '../../../shared/use-case-lib';
import { InvalidRequestError, NotExistError } from '../../../shared/utils/errors';
import { DownloadFileRequestDTO } from './download-file-request-DTO';
import { DownloadFileResponseDTO } from './download-file-response-DTO';

export class DownloadFileUseCase implements UseCase<DownloadFileRequestDTO, DownloadFileResponseDTO> {
  private readonly _storageItemRepository: StorageItemRepository;
  private readonly _userRepository: UserRepository;

  constructor(storageItemRepository: StorageItemRepository, userRepository: UserRepository) {
    this._storageItemRepository = storageItemRepository;
    this._userRepository = userRepository;
  }

  public async handle(dto: DownloadFileRequestDTO): Promise<DownloadFileResponseDTO> {
    const fileToDownload = await this._storageItemRepository.findOneById(dto.id);

    if (!fileToDownload) {
      throw new NotExistError('the file does not exist.');
    }

    if (fileToDownload.isInTrash) {
      throw new InvalidRequestError('the file is in a trash.');
    }

    const responseDto: DownloadFileResponseDTO = {
      name: fileToDownload.name,
      mimeType: fileToDownload.mimeType!,
      filePath: fileToDownload.filePath!,
      fileSize: fileToDownload.fileSize!,
      fileInitializationVector: fileToDownload.initializationVector!,
    };

    if (fileToDownload.isEncryptedWithClientKey) {
      const user = await this._userRepository.findOneById(dto.ownerId);
      if (!user) throw new InvalidRequestError('the owner is not found');

      responseDto.clientEncryptionKeyInitializationVector = user.encryptionKeyInitializationVector!;
    }

    return responseDto;
  }
}
