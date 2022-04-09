import { StorageItem } from '../../../entities';
import { constructMockStorageItemRepository } from '../../../infra/data-access/mock/repositories/mock-storage-item-repository';
import { DownloadFileThumbnailRequestDTO } from './contracts';
import { DownloadFileThumbnailUseCase } from './download-file-thumbnail-use-case';

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
      isInTrash: true,
      thumbnailPath: 'test thumbnail path',
      thumbnailSize: 9999,
      thumbnailInitializationVector: 'test thumbnail initialization vector',
      clientEncryptionKey: 'test client encryption key',
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

describe('test DownloadFileThumbnailUseCase handle method', () => {
  it('should return a file thumbnail item to download', async () => {
    const downloadFileThumbnailUseCase = new DownloadFileThumbnailUseCase(mockStorageItemRepository);

    const mockDownloadFileThumbnailUseCaseDTO: DownloadFileThumbnailRequestDTO = {
      id: TEST_FILE_1_ID,
      ownerId: TEST_USER_1_ID,
    };

    const responseDTO = await downloadFileThumbnailUseCase.handle(mockDownloadFileThumbnailUseCaseDTO);

    expect(responseDTO?.thumbnailPath).toBeTruthy();
    expect(responseDTO?.thumbnailSize).toBeTruthy();
    expect(responseDTO?.thumbnailInitializationVector).toBeTruthy();
  });
});
