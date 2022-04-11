import crypto from 'crypto';
import { StorageItem } from '../../../entities';
import { constructMockStorageItemRepository } from '../../../infra/data-access/mock/repositories/mock-storage-item-repository';
import { RemoveFolderRequestDTO } from './contracts';
import { RemoveFolderUseCase } from './remove-folder-use-case';

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

describe('test RemoveFolderUseCase handle method', () => {
  it('should remove a file', async () => {
    const folderItemToRemove = await mockStorageItemRepository.findOneById(TEST_FOLDER_1_ID);
    expect(folderItemToRemove?.isInTrash).toBe(false);

    const itemsToRemove = await mockStorageItemRepository.findAllDescendantsById(TEST_FOLDER_1_ID, false);

    itemsToRemove.forEach((item) => expect(item.isInTrash).not.toBe(true));

    const removeFolderUseCase = new RemoveFolderUseCase(mockStorageItemRepository);

    const mockRemoveFolderUseCaseDTO: RemoveFolderRequestDTO = {
      id: TEST_FOLDER_1_ID,
      ownerId: TEST_USER_1_ID,
    };

    await removeFolderUseCase.handle(mockRemoveFolderUseCaseDTO);

    const removedFolderItem = await mockStorageItemRepository.findOneById(TEST_FOLDER_1_ID);
    const items = await mockStorageItemRepository.findAllDescendantsById(TEST_FOLDER_1_ID, false);
    items.forEach((item) => expect(item.isInTrash).toBe(true));

    expect(removedFolderItem?.isInTrash).toBe(true);
  });
});
