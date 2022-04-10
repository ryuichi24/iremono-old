import crypto from 'crypto';
import { StorageItem } from '../../../entities';
import { constructMockStorageItemRepository } from '../../../infra/data-access/mock/repositories/mock-storage-item-repository';
import { UpdateFileRequestDTO } from './contracts';
import { UpdateFileUseCase } from './update-file-use-case';

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

describe('test UpdateFileUseCase handle method', () => {
  it('should update file name', async () => {
    const NEW_FILE_NAME = 'test file 1 updated';
    const oldFileItem = await mockStorageItemRepository.findOneById(TEST_FILE_1_ID);
    expect(oldFileItem?.name).not.toBe(NEW_FILE_NAME);

    const updateFileUseCase = new UpdateFileUseCase(mockStorageItemRepository);

    const mockUpdateFileDTO: UpdateFileRequestDTO = {
      id: TEST_FILE_1_ID,
      name: NEW_FILE_NAME,
      ownerId: TEST_USER_1_ID,
    };

    const responseDTO = await updateFileUseCase.handle(mockUpdateFileDTO);

    const updatedFileItem = await mockStorageItemRepository.findOneById(TEST_FILE_1_ID);

    expect(responseDTO.name).toBe(NEW_FILE_NAME);
    expect(updatedFileItem?.name).toBe(NEW_FILE_NAME);
  });
});
