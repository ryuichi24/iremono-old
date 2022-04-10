import crypto from 'crypto';
import { StorageItem } from '../../../entities';
import { constructMockStorageItemRepository } from '../../../infra/data-access/mock/repositories/mock-storage-item-repository';
import { ListItemsInFolderRequestDTO } from './contracts';
import { ListItemsInFolderUseCase } from './list-items-in-folder-use-case';

const TEST_USER_1_ID = crypto.randomUUID();
const TEST_ROOT_FOLDER_1_ID = crypto.randomUUID();
const TEST_FOLDER_1_ID = crypto.randomUUID();
const TEST_FILE_1_ID = crypto.randomUUID();
const TEST_FILE_2_ID = crypto.randomUUID();
const TEST_FILE_3_ID = crypto.randomUUID();

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
  new StorageItem(
    { name: 'test file 2', isFolder: false, ownerId: TEST_USER_1_ID, parentId: TEST_FOLDER_1_ID },
    TEST_FILE_2_ID,
  ),
  new StorageItem(
    { name: 'test file 3', isFolder: false, ownerId: TEST_USER_1_ID, parentId: TEST_FOLDER_1_ID },
    TEST_FILE_3_ID,
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

describe('test ListItemsInFolderUseCase handle method', () => {
  it('should return all items in a folder', async () => {
    const listItemsInFolderUseCase = new ListItemsInFolderUseCase(mockStorageItemRepository);

    const mockListItemsInFolderDTO: ListItemsInFolderRequestDTO = {
      ownerId: TEST_USER_1_ID,
      parentId: TEST_FOLDER_1_ID,
    };

    const responseDTO = await listItemsInFolderUseCase.handle(mockListItemsInFolderDTO);

    expect(responseDTO.entries.length).toBe(3);
  });
});
