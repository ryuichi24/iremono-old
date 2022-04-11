import crypto from 'crypto';
import { jest } from '@jest/globals';
import { RefreshTokenRequestDTO } from './contracts';
import { RefreshTokenUseCase } from './refresh-token-use-case';
import { HashService } from '../../../services/hash-service';
import { IAccessTokenService, IRefreshTokenService, TokenOutput } from '../../../services/token-service';

beforeEach(async () => {});

afterEach(async () => {});

describe('test RefreshTokenUseCase handle method', () => {
  it('should return access token and refresh token', async () => {
    const TEST_USER_ID = 'test-user-id';
    const TEST_USER_REFRESH_TOKEN = 'test-refresh-token';

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
          value: TEST_USER_REFRESH_TOKEN,
          expiresIn: '86400000',
        };
      }),
      verify: jest.fn((token: string): string => {
        return TEST_USER_ID;
      }),
      revoke: jest.fn((token: string): string => {
        return '';
      }),
    };

    const refreshTokenUseCase = new RefreshTokenUseCase(mockAccessTokenService, mockRefreshTokenService);

    const mockRefreshTokenDTO: RefreshTokenRequestDTO = {
      refreshToken: TEST_USER_REFRESH_TOKEN,
    };

    const responseDTO = await refreshTokenUseCase.handle(mockRefreshTokenDTO);

    expect(responseDTO.accessToken).toBeTruthy();
    expect(responseDTO.refreshToken).toBeTruthy();
  });
});
