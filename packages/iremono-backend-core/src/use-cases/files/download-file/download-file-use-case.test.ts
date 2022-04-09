import { jest } from '@jest/globals';
import { StorageItem } from '../../../entities';
import { constructMockStorageItemRepository } from '../../../infra/data-access/mock/repositories/mock-storage-item-repository';
import { FileTokenOutput, IDownloadFileTokenService, TokenOutput } from '../../../services';
import { DownloadFileRequestDTO } from './contracts';
import { DownloadFileUseCase } from './download-file-use-case';

const TEST_USER_1_ID = '953a7c7d-efbf-467a-a57c-6be18b2456d7';
const TEST_ROOT_FOLDER_1_ID = 'f6bbf56a-c4d1-404c-bf5d-66f54be46cca';
const TEST_FOLDER_1_ID = '1a1cec9e-9bf0-4b93-bcc1-0f2032d73826';
const TEST_FILE_1_ID = '44bc7bb7-5e8d-4382-bd26-41e8eb87a29e';

const mockItems = [
  new StorageItem(
    { name: 'test root folder', isFolder: true, ownerId: TEST_USER_1_ID, parentId: null },
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
