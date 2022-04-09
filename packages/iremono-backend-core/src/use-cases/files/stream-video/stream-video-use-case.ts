import { StorageItemRepository } from '../../../repositories';
import { IStreamFileTokenService } from '../../../services';
import { InvalidRequestError, NotExistError } from '../../../shared/utils/errors';
import { IStreamVideoUseCase, StreamVideoRequestDTO, StreamVideoResponseDTO } from './contracts';

export class StreamVideoUseCase implements IStreamVideoUseCase {
  constructor(
    private readonly _storageItemRepository: StorageItemRepository,
    private readonly _streamFileTokenService: IStreamFileTokenService,
  ) {}

  public async handle(dto: StreamVideoRequestDTO): Promise<StreamVideoResponseDTO> {
    const payloadFromToken = this._streamFileTokenService.verify(dto.streamFileToken);

    if (payloadFromToken?.fileId !== dto.id) throw new InvalidRequestError('the stream file token is invalid.');

    const videoToStream = await this._storageItemRepository.findOneById(payloadFromToken.fileId);

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
      clientEncryptionKey: payloadFromToken.clientEncryptionKey,
    };

    return responseDto;
  }
}
