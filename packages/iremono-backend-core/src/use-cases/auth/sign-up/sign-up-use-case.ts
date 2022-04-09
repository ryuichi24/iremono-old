import { User } from '../../../entities';
import { makeUserDTO } from '../../../models';
import { UserRepository } from '../../../repositories';
import { HashService, IAccessTokenService, IRefreshTokenService } from '../../../services';
import { InvalidRequestError } from '../../../shared/utils/errors';
import { CreateRootFolderUseCase } from '../../folders';
import { ISignUpUseCase, SignUpRequestDTO, SignUpResponseDTO } from './contracts';

export class SignUpUseCase implements ISignUpUseCase {
  private readonly _userRepository: UserRepository;
  private readonly _hashService: HashService;
  private readonly _createRootFolderUseCase: CreateRootFolderUseCase;

  constructor(
    userRepository: UserRepository,
    private readonly _accessTokenService: IAccessTokenService,
    private readonly _refreshTokenService: IRefreshTokenService,
    hashService: HashService,
    createRootFolderUseCase: CreateRootFolderUseCase,
  ) {
    this._userRepository = userRepository;
    this._hashService = hashService;
    this._createRootFolderUseCase = createRootFolderUseCase;
  }

  public async handle(dto: SignUpRequestDTO): Promise<SignUpResponseDTO> {
    const isDuplicate = !!(await this._userRepository.findOneByEmail(dto.email));
    if (isDuplicate) throw new InvalidRequestError('the email is already registered');

    const user = new User({ email: dto.email, password: dto.password });
    await user.hashPassword(this._hashService.hash);
    const savedUser = await this._userRepository.save(user);

    // TODO: decouple root folder initialization with event emitter
    await this._createRootFolderUseCase.handle({ name: 'all files', ownerId: savedUser.id, folderType: 'normal' });

    const accessToken = this._accessTokenService.generate({ id: savedUser.id });
    const refreshToken = this._refreshTokenService.generate(savedUser.id);

    return {
      accessToken,
      refreshToken,
      user: makeUserDTO(savedUser),
    };
  }
}
