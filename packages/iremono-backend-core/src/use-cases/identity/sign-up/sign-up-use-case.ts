import { Identity, StorageItem } from '../../../entities';
import { IdentityRepository, StorageItemRepository } from '../../../repositories';
import { HashService, TokenService } from '../../../services';
import { UseCase } from '../../../shared/use-case-lib';
import { SignUpRequestDTO } from './sign-up-request-DTO';
import { SignUpResponseDTO } from './sign-up-response-DTO';

export class SignUpUseCase implements UseCase<SignUpRequestDTO, SignUpResponseDTO> {
  private readonly _identityRepository: IdentityRepository;
  private readonly _storageItemRepository: StorageItemRepository;
  private readonly _tokenService: TokenService;
  private readonly _hashService: HashService;

  constructor(
    identityRepository: IdentityRepository,
    storageItemRepository: StorageItemRepository,
    tokenService: TokenService,
    hashService: HashService,
  ) {
    this._identityRepository = identityRepository;
    this._storageItemRepository = storageItemRepository;
    this._tokenService = tokenService;
    this._hashService = hashService;
  }

  public async handle(dto: SignUpRequestDTO): Promise<SignUpResponseDTO> {
    const isDuplicate = !!(await this._identityRepository.findOneByEmail(dto.email));
    if (isDuplicate) throw new Error('the email is already registered');

    const identity = new Identity({ email: dto.email, password: dto.password });
    await identity.hashPassword(this._hashService.hash);
    const savedIdentity = await this._identityRepository.save(identity);

    // TODO: decouple root folder initialization with event emitter
    const rootFolder = new StorageItem(
      {
        name: 'all_files',
        parentId: null,
        isFolder: true,
        isRootFolder: true,
        ownerId: savedIdentity.id,
      },
      '0',
    );

    await this._storageItemRepository.save(rootFolder);

    const accessToken = this._tokenService.generateAccessToken({ id: savedIdentity.id });

    return {
      accessToken: accessToken.value,
      expiresIn: accessToken.expiresIn,
    };
  }
}
