import { jest } from '@jest/globals';
import { IRefreshTokenService, TokenOutput } from '../../../services/token-service';
import { SignOutRequestDTO } from './contracts';
import { SignOutUseCase } from './sign-out-use-case';

beforeEach(async () => {});

afterEach(async () => {});

describe('test SignOutUseCase handle method', () => {
  it('should revoke refresh token to sign user out', async () => {
    const REFRESH_TOKEN = 'test-refresh-token';

    const mockRefreshTokenService: IRefreshTokenService = {
      generate: jest.fn((payload: string): TokenOutput => {
        return {
          value: REFRESH_TOKEN,
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

    const signOutUseCase = new SignOutUseCase(mockRefreshTokenService);

    const mockSignOutDTO: SignOutRequestDTO = {
      refreshToken: REFRESH_TOKEN,
    };

    await expect(signOutUseCase.handle(mockSignOutDTO)).resolves.not.toThrowError();
  });
});
