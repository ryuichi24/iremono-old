import { StorageItemRepository } from '../../../repositories';
import { TokenService } from '../../../services';
import { UseCase } from '../../../shared/use-case-lib';
import { InvalidRequestError, NotExistError } from '../../../shared/utils/errors';
import { GetDownloadFileTokenRequestDTO } from './get-download-file-token-request-DTO';
import { GetDownloadFileTokenResponseDTO } from './get-download-file-token-response-DTO';

export class GetDownloadFileTokenUseCase
  implements UseCase<GetDownloadFileTokenRequestDTO, GetDownloadFileTokenResponseDTO>
{
  private readonly _storageItemRepository: StorageItemRepository;
  private readonly _tokenService: TokenService;

  constructor(storageItemRepository: StorageItemRepository, tokenService: TokenService) {
    this._storageItemRepository = storageItemRepository;
    this._tokenService = tokenService;
  }

  public async handle(dto: GetDownloadFileTokenRequestDTO): Promise<GetDownloadFileTokenResponseDTO> {
    const fileToDownload = await this._storageItemRepository.findOneById(dto.id);

    if (!fileToDownload) {
      throw new NotExistError('the file does not exist.');
    }

    if (fileToDownload.isInTrash) {
      throw new InvalidRequestError('the file is in a trash.');
    }

    if (fileToDownload.ownerId !== dto.ownerId) {
      throw new InvalidRequestError(`the owner does not match the file's owner`);
    }

    const downloadFileToken = this._tokenService.generateDownloadFileToken(fileToDownload.id);
    return { downloadFileToken };
  }
}
