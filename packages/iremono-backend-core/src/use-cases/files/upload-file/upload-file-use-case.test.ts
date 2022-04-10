import crypto from 'crypto';
import { StorageItem } from '../../../entities';
import { constructMockStorageItemRepository } from '../../../infra/data-access/mock/repositories/mock-storage-item-repository';
import { UploadFileRequestDTO } from './contracts';
import { UploadFileUseCase } from './upload-file-use-case';

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
    { name: 'test folder 1', isFolder: true, ownerId: TEST_USER_1_ID, parentId: TEST_ROOT_FOLDER_1_ID },
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
    const createdItem = await mockStorageItemRepository.findOneById(responseDTO.id!);

    expect(createdItem).toBeTruthy();
    expect(createdItem?.isFolder).toBe(false);
    expect(responseDTO).toBeTruthy();
    expect(responseDTO?.isFolder).toBe(false);
  });
});
