import crypto from 'crypto';
import { jest } from '@jest/globals';
import { StorageItem } from '../../../entities';
import { constructMockStorageItemRepository } from '../../../infra/data-access/mock/repositories/mock-storage-item-repository';
import { FileTokenOutput, IDownloadFileTokenService, TokenOutput } from '../../../services';
import { DownloadFileRequestDTO } from './contracts';
import { DownloadFileUseCase } from './download-file-use-case';

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
    {
      name: 'test file 1',
      isFolder: false,
      ownerId: TEST_USER_1_ID,
      parentId: TEST_FOLDER_1_ID,
      mimeType: 'test mime type',
      filePath: 'test file path',
      fileSize: 9999,
      initializationVector: 'test initialization vector',
    },
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

describe('test DownloadFileUseCase handle method', () => {
  it('should return a file item to download', async () => {
    const DOWNLOAD_FILE_TOKEN = '8841d0eb5b8c7c089e7db15fd59e80c3';

    const mockDownloadFileTokenService: IDownloadFileTokenService = {
      generate: jest.fn((payload: FileTokenOutput): TokenOutput => {
        return {
          expiresIn: '',
          value: '',
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

    const downloadFileUseCase = new DownloadFileUseCase(mockStorageItemRepository, mockDownloadFileTokenService);

    const mockDownloadFileUseCaseDTO: DownloadFileRequestDTO = {
      id: TEST_FILE_1_ID,
      downloadFileToken: DOWNLOAD_FILE_TOKEN,
    };

    const responseDTO = await downloadFileUseCase.handle(mockDownloadFileUseCaseDTO);

    expect(responseDTO.name).toBeTruthy();
    expect(responseDTO.mimeType).toBeTruthy();
    expect(responseDTO.filePath).toBeTruthy();
    expect(responseDTO.fileSize).toBeTruthy();
    expect(responseDTO.fileInitializationVector).toBeTruthy();
  });
});
