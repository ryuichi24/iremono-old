import crypto from 'crypto';
import { jest } from '@jest/globals';
import { constructMockUserRepository } from '../../../infra/data-access/mock/repositories/mock-user-repository';
import { HashService } from '../../../services/hash-service';
import { IAccessTokenService, IRefreshTokenService, TokenOutput } from '../../../services/token-service';
import {
  CreateRootFolderRequestDTO,
  CreateRootFolderResponseDTO,
  ICreateRootFolderUseCase,
} from '../../folders/create-root-folder/contracts';
import { SignUpRequestDTO } from './contracts';
import { SignUpUseCase } from './sign-up-use-case';

const mockUserRepository = constructMockUserRepository();

beforeEach(async () => {});

afterEach(async () => {});

describe('test SignUpUseCase handle method', () => {
  it('should create new user and return access token and refresh token', async () => {
    const mockHashService: HashService = {
      hash: jest.fn(async (value: string): Promise<string> => {
        return crypto.createHash('sha256').update('random-test-key').digest().toString();
      }),
      compare: jest.fn(async (plainText: string, hashedText: string): Promise<boolean> => {
        return true;
      }),
    };

    const mockAccessTokenService: IAccessTokenService = {
      generate: jest.fn((payload: { [key: string]: string }): TokenOutput => {
        return {
          value: 'test-access-token',
          expiresIn: '900000',
        };
      }),
      verify: jest.fn((token: string): { [key: string]: string } => {
        return {};
      }),
    };

    const mockRefreshTokenService: IRefreshTokenService = {
      generate: jest.fn((payload: string): TokenOutput => {
        return {
          value: 'test-refresh-token',
          expiresIn: '86400000',
        };
      }),
      verify: jest.fn((token: string): string => {
        return '';
      }),
      revoke: jest.fn((token: string): string => {
        return '';
      }),
    };

    const TEST_USER_EMAIL = 'test@example.com';
    const TEST_USER_PASSWORD = 'testuser123';

    const mockCreateRootFolderUseCase: ICreateRootFolderUseCase = {
      handle: jest.fn(async (dto: CreateRootFolderRequestDTO): Promise<CreateRootFolderResponseDTO> => {
        return {} as any;
      }),
    };

    const signUpUseCase = new SignUpUseCase(
      mockUserRepository,
      mockAccessTokenService,
      mockRefreshTokenService,
      mockHashService,
      mockCreateRootFolderUseCase,
    );

    const mockSignUpDTO: SignUpRequestDTO = {
      email: TEST_USER_EMAIL,
      password: TEST_USER_PASSWORD,
    };

    const responseDTO = await signUpUseCase.handle(mockSignUpDTO);

    expect(responseDTO.accessToken).toBeTruthy();
    expect(responseDTO.refreshToken).toBeTruthy();
    expect(responseDTO.user).toBeTruthy();
    expect(responseDTO.user.id).toBeTruthy();
    expect(responseDTO.user.email).toBe(TEST_USER_EMAIL);
  });
});
