import crypto from 'crypto';
import { jest } from '@jest/globals';
import { StorageItem } from '../../../entities';
import { constructMockStorageItemRepository } from '../../../infra/data-access/mock/repositories/mock-storage-item-repository';
import {
  FileTokenOutput,
  IDownloadFileTokenService,
  IStreamFileTokenService,
  TokenOutput,
} from '../../../services/token-service';
import { GetFileTokenRequestDTO } from './contracts';
import { GetFileTokenUseCase } from './get-file-token-use-case';

const TEST_USER_1_ID = crypto.randomUUID();
const TEST_ROOT_FOLDER_1_ID = crypto.randomUUID();
const TEST_FOLDER_1_ID = crypto.randomUUID();
const TEST_FILE_1_ID = crypto.randomUUID();

const mockItems = [
  new StorageItem(
    { name: 'test root folder', isFolder: true, ownerId: TEST_USER_1_ID, parentId: null, isRootFolder: true },
    TEST_ROOT_FOLDER_1_ID,
  ),
  new StorageItem(
    {
      name: 'test folder 1',
      isFolder: true,
      ownerId: TEST_USER_1_ID,
      parentId: TEST_ROOT_FOLDER_1_ID,
    },
    TEST_FOLDER_1_ID,
  ),
  new StorageItem(
    { name: 'test file 1', isFolder: false, ownerId: TEST_USER_1_ID, parentId: TEST_FOLDER_1_ID },
    TEST_FILE_1_ID,
  ),
];

const mockStorageItemRepository = constructMockStorageItemRepository();

beforeEach(async () => {
  for (const item of mockItems) {
    await mockStorageItemRepository.save(item);
  }
});

afterEach(async () => {
  for (const item of mockItems) {
    await mockStorageItemRepository.remove(item);
  }
});

describe('test GetFileTokenUseCase handle method', () => {
  const DOWNLOAD_FILE_TOKEN = 'c74ac767e09ef9a198441bb363b73f9d';
  const STREAM_FILE_TOKEN = '6b19ced6e9fba47f13aff4085b1cc661';

  const mockDownloadFileTokenService: IDownloadFileTokenService = {
    generate: jest.fn((payload: FileTokenOutput): TokenOutput => {
      return {
        expiresIn: '999999',
        value: DOWNLOAD_FILE_TOKEN,
      };
    }),
    verify: jest.fn((token: string): FileTokenOutput => {
      return {
        fileId: TEST_FILE_1_ID,
        clientEncryptionKey: '',
      };
    }),
    revoke: jest.fn((token: string): void => {}),
  };

  const mockStreamFileTokenService: IStreamFileTokenService = {
    generate: jest.fn((payload: FileTokenOutput): TokenOutput => {
      return {
        expiresIn: '999999',
        value: STREAM_FILE_TOKEN,
      };
    }),
    verify: jest.fn((token: string): FileTokenOutput => {
      return {
        fileId: TEST_FILE_1_ID,
        clientEncryptionKey: '',
      };
    }),
  };

  it('should return a download file token', async () => {
    const TOKEN_TYPE = 'download';

    const getFileTokenUseCase = new GetFileTokenUseCase(
      mockStorageItemRepository,
      mockDownloadFileTokenService,
      mockStreamFileTokenService,
    );

    const mockGetFileTokenUseCaseDTO: GetFileTokenRequestDTO = {
      id: TEST_FILE_1_ID,
      ownerId: TEST_USER_1_ID,
      tokenType: TOKEN_TYPE,
      clientEncryptionKey: '',
    };

    const responseDTO = await getFileTokenUseCase.handle(mockGetFileTokenUseCaseDTO);

    expect(responseDTO.tokenType).toBe(TOKEN_TYPE);
    expect(responseDTO.fileToken?.value).toBe(DOWNLOAD_FILE_TOKEN);
  });

  it('should return a stream file token', async () => {
    const TOKEN_TYPE = 'stream';

    const getFileTokenUseCase = new GetFileTokenUseCase(
      mockStorageItemRepository,
      mockDownloadFileTokenService,
      mockStreamFileTokenService,
    );

    const mockGetFileTokenUseCaseDTO: GetFileTokenRequestDTO = {
      id: TEST_FILE_1_ID,
      ownerId: TEST_USER_1_ID,
      tokenType: TOKEN_TYPE,
      clientEncryptionKey: '',
    };

    const responseDTO = await getFileTokenUseCase.handle(mockGetFileTokenUseCaseDTO);

    expect(responseDTO.tokenType).toBe(TOKEN_TYPE);
    expect(responseDTO.fileToken?.value).toBe(STREAM_FILE_TOKEN);
  });
});
