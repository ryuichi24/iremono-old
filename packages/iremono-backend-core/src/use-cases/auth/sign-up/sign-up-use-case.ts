import { User, StorageItem } from '../../../entities';
import { UserRepository, StorageItemRepository } from '../../../repositories';
import { HashService, TokenService } from '../../../services';
import { UseCase } from '../../../shared/use-case-lib';
import { SignUpRequestDTO } from './sign-up-request-DTO';
import { SignUpResponseDTO } from './sign-up-response-DTO';

export class SignUpUseCase implements UseCase<SignUpRequestDTO, SignUpResponseDTO> {
  private readonly _userRepository: UserRepository;
  private readonly _storageItemRepository: StorageItemRepository;
  private readonly _tokenService: TokenService;
  private readonly _hashService: HashService;

  constructor(
    userRepository: UserRepository,
    storageItemRepository: StorageItemRepository,
    tokenService: TokenService,
    hashService: HashService,
  ) {
    this._userRepository = userRepository;
    this._storageItemRepository = storageItemRepository;
    this._tokenService = tokenService;
    this._hashService = hashService;
  }

  public async handle(dto: SignUpRequestDTO): Promise<SignUpResponseDTO> {
    const isDuplicate = !!(await this._userRepository.findOneByEmail(dto.email));
    if (isDuplicate) throw new Error('the email is already registered');

    const user = new User({ email: dto.email, password: dto.password });
    await user.hashPassword(this._hashService.hash);
    const savedUser = await this._userRepository.save(user);

    // TODO: decouple root folder initialization with event emitter
    const rootFolder = new StorageItem(
      {
        name: 'all_files',
        parentId: null,
        isFolder: true,
        isRootFolder: true,
        ownerId: savedUser.id,
      },
      '0',
    );

    await this._storageItemRepository.save(rootFolder);

    const accessToken = this._tokenService.generateAccessToken({ id: savedUser.id });

    return {
      accessToken: accessToken.value,
      expiresIn: accessToken.expiresIn,
    };
  }
}
