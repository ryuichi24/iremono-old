import crypto from 'crypto';
import { jest } from '@jest/globals';
import { constructMockUserRepository } from '../../../infra/data-access/mock/repositories/mock-user-repository';
import { SignInRequestDTO } from './contracts';
import { SignInUseCase } from './sign-in-use-case';
import { User } from '../../../entities';
import { HashService } from '../../../services/hash-service';
import { IAccessTokenService, IRefreshTokenService, TokenOutput } from '../../../services/token-service';

const TEST_USER_1_ID = crypto.randomUUID();
const TEST_USER_1_EMAIL = 'test@example.com';
const TEST_USER_1_PASSWORD = 'testuser123';

const TEST_USER_2_ID = crypto.randomUUID();
const TEST_USER_2_EMAIL = 'test@example.com';
const TEST_USER__1PASSWORD = 'testuser123';

const mockItems = [
  new User(
    {
      email: TEST_USER_1_EMAIL,
      password: '',
    },
    TEST_USER_1_ID,
  ),
  new User(
    {
      email: TEST_USER_2_EMAIL,
      password: '',
    },
    TEST_USER_2_ID,
  ),
];

const mockUserRepository = constructMockUserRepository();

beforeEach(async () => {
  for (const item of mockItems) {
    await mockUserRepository.save(item);
  }
});

afterEach(async () => {
  for (const item of mockItems) {
    // await mockUserRepository.remove(item);
  }
});

describe('test SignInUseCase handle method', () => {
  it('return access token and refresh token', async () => {
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

    const signInUseCase = new SignInUseCase(
      mockUserRepository,
      mockAccessTokenService,
      mockRefreshTokenService,
      mockHashService,
    );

    const mockSignInDTO: SignInRequestDTO = {
      email: TEST_USER_1_EMAIL,
      password: TEST_USER_1_PASSWORD,
    };

    const responseDTO = await signInUseCase.handle(mockSignInDTO);

    expect(responseDTO.accessToken).toBeTruthy();
    expect(responseDTO.refreshToken).toBeTruthy();
    expect(responseDTO.user).toBeTruthy();
    expect(responseDTO.user.id).toBeTruthy();
    expect(responseDTO.user.email).toBe(TEST_USER_1_EMAIL);
  });
});
