import { StorageItem } from '../../../entities';
import { constructMockStorageItemRepository } from '../../../infra/data-access/mock/repositories/mock-storage-item-repository';
import { UploadFileRequestDTO } from './contracts';
import { UploadFileUseCase } from './upload-file-use-case';

const TEST_USER_1_ID = '953a7c7d-efbf-467a-a57c-6be18b2456d7';
const TEST_ROOT_FOLDER_1_ID = 'f6bbf56a-c4d1-404c-bf5d-66f54be46cca';
const TEST_FOLDER_1_ID = '1a1cec9e-9bf0-4b93-bcc1-0f2032d73826';
const TEST_FILE_1_ID = '1a1cec9e-9bf0-4b93-bcc1-0f2032d73826';

const mockItems = [
  new StorageItem(
    { name: 'test root folder', isFolder: true, ownerId: TEST_USER_1_ID, parentId: null },
    TEST_ROOT_FOLDER_1_ID,
  ),
  new StorageItem(
    { name: 'test folder 1', isFolder: true, ownerId: TEST_USER_1_ID, parentId: TEST_ROOT_FOLDER_1_ID },
    TEST_FOLDER_1_ID,
  ),
  new StorageItem(
    { name: 'test file 1', isFolder: false, ownerId: TEST_USER_1_ID, parentId: TEST_FOLDER_1_ID },
    TEST_FILE_1_ID,
  ),
];

const mockStorageItemRepository = constructMockStorageItemRepository();

beforeEach(() => {
  mockItems.forEach((item) => mockStorageItemRepository.save(item));
});

afterEach(() => {
  mockItems.forEach((item) => mockStorageItemRepository.remove(item));
});

describe('test UploadFileUseCase handle method', () => {
  it('should create new file item', async () => {
    const uploadFileUseCase = new UploadFileUseCase(mockStorageItemRepository);

    const mockUploadFileDTO: UploadFileRequestDTO = {
      name: 'test file name',
      parentId: TEST_FOLDER_1_ID,
      filePath: 'test file path',
      fileSize: 1000,
      mimeType: 'test mime type',
      fileInitializationVector: 'test file initialization vector',
      ownerId: TEST_USER_1_ID,
      thumbnailPath: 'test thumbnail path',
      thumbnailSize: 1000,
      thumbnailInitializationVector: 'test thumbnail initialization vector',
      isCryptoFolderItem: false,
    };

    const responseDTO = await uploadFileUseCase.handle(mockUploadFileDTO);

    expect(responseDTO.id).toBeTruthy();
    expect(responseDTO.isFolder).toBe(false);
  });
});
