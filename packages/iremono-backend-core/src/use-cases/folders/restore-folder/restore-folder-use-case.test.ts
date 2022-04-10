import crypto from 'crypto';
import { StorageItem } from '../../../entities';
import { constructMockStorageItemRepository } from '../../../infra/data-access/mock/repositories/mock-storage-item-repository';
import { RestoreFolderRequestDTO } from './contracts';
import { RestoreFolderUseCase } from './restore-folder-use-case';

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
      isInTrash: true
    },
    TEST_FOLDER_1_ID,
  ),
  new StorageItem(
    { name: 'test file 1', isFolder: false, ownerId: TEST_USER_1_ID, parentId: TEST_FOLDER_1_ID, isInTrash: true },
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

describe('test RestoreFolderUseCase handle method', () => {
  it('should restore a folder and its descendants', async () => {
    const folderItemToRestore = await mockStorageItemRepository.findOneById(TEST_FOLDER_1_ID);
    expect(folderItemToRestore?.isInTrash).toBe(true);

    const itemsToRemove = await mockStorageItemRepository.findAllDescendantsById(TEST_FOLDER_1_ID, false);

    itemsToRemove.forEach((item) => expect(item.isInTrash).toBe(true));

    const restoreFolderUseCase = new RestoreFolderUseCase(mockStorageItemRepository);

    const mockRestoreFolderUseCaseDTO: RestoreFolderRequestDTO = {
      id: TEST_FOLDER_1_ID,
      ownerId: TEST_USER_1_ID,
    };

    await restoreFolderUseCase.handle(mockRestoreFolderUseCaseDTO);

    const removedFolderItem = await mockStorageItemRepository.findOneById(TEST_FOLDER_1_ID);
    const items = await mockStorageItemRepository.findAllDescendantsById(TEST_FOLDER_1_ID, false);
    items.forEach((item) => expect(item.isInTrash).toBe(false));

    expect(removedFolderItem?.isInTrash).toBe(false);
  });
});
