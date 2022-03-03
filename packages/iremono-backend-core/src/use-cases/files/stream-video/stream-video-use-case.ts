import { StorageItemRepository } from '../../../repositories';
import { TokenService } from '../../../services';
import { UseCase } from '../../../shared/use-case-lib';
import { InvalidRequestError, NotExistError } from '../../../shared/utils/errors';
import { StreamVideoRequestDTO } from './stream-video-request-DTO';
import { StreamVideoResponseDTO } from './stream-video-response-DTO';

export class StreamVideoUseCase implements UseCase<StreamVideoRequestDTO, StreamVideoResponseDTO> {
  private readonly _storageItemRepository: StorageItemRepository;
  private readonly _tokenService: TokenService;

  constructor(storageItemRepository: StorageItemRepository, tokenService: TokenService) {
    this._storageItemRepository = storageItemRepository;
    this._tokenService = tokenService;
  }

  public async handle(dto: StreamVideoRequestDTO): Promise<StreamVideoResponseDTO> {
    const fileIdFromToken = this._tokenService.verifyStreamFileToken(dto.streamFileToken);

    if (fileIdFromToken !== dto.id) throw new InvalidRequestError('the stream file token is invalid.');

    const videoToStream = await this._storageItemRepository.findOneById(dto.id);

    if (!videoToStream) {
      throw new NotExistError('the video does not exist.');
    }

    if (videoToStream.isInTrash) {
      throw new InvalidRequestError('the video is in a trash.');
    }

    const responseDto: StreamVideoResponseDTO = {
      name: videoToStream.name,
      mimeType: videoToStream.mimeType!,
      filePath: videoToStream.filePath!,
      fileSize: videoToStream.fileSize!,
      fileInitializationVector: videoToStream.initializationVector!,
    };

    return responseDto;
  }
}
