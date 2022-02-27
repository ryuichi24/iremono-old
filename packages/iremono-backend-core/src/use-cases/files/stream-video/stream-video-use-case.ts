import { StorageItemRepository } from '../../../repositories';
import { UseCase } from '../../../shared/use-case-lib';
import { InvalidRequestError, NotExistError } from '../../../shared/utils/errors';
import { StreamVideoRequestDTO } from './stream-video-request-DTO';
import { StreamVideoResponseDTO } from './stream-video-response-DTO';

export class StreamVideoUseCase implements UseCase<StreamVideoRequestDTO, StreamVideoResponseDTO> {
  private readonly _storageItemRepository: StorageItemRepository;

  constructor(storageItemRepository: StorageItemRepository) {
    this._storageItemRepository = storageItemRepository;
  }

  public async handle(dto: StreamVideoRequestDTO): Promise<StreamVideoResponseDTO> {
    const videoToStream = await this._storageItemRepository.findOneById(dto.id);

    if (!videoToStream) {
      throw new NotExistError('the video does not exist.');
    }

    if (videoToStream.isInTrash) {
      throw new InvalidRequestError('the video is in a trash.');
    }

    if (videoToStream.ownerId !== dto.ownerId) {
      throw new InvalidRequestError(`the owner does not match the video's owner`);
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
