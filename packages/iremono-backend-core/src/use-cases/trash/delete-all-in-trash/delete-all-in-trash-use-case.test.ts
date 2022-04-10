import crypto from 'crypto';
import { StorageItem } from '../../../entities';
import { constructMockStorageItemRepository } from '../../../infra/data-access/mock/repositories/mock-storage-item-repository';
import { DeleteAllInTrashRequestDTO } from './contracts';
import { DeleteAllInTrashUseCase } from './delete-all-in-trash-use-case';

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
    { name: 'test file 1', isFolder: false, ownerId: TEST_USER_1_ID, parentId: TEST_FOLDER_1_ID, isInTrash: true },
    TEST_FILE_1_ID,
  ),
  new StorageItem(
    { name: 'test file 2', isFolder: false, ownerId: TEST_USER_1_ID, parentId: TEST_FOLDER_1_ID, isInTrash: true },
    TEST_FILE_1_ID,
  ),
  new StorageItem(
    { name: 'test file 3', isFolder: false, ownerId: TEST_USER_1_ID, parentId: TEST_FOLDER_1_ID, isInTrash: true },
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

describe('test DeleteAllInTrashUseCase handle method', () => {
  it('should delete all items in trash and return the deleted file items', async () => {
    const rootFolder = await mockStorageItemRepository.findRootFolderByOwnerId(TEST_USER_1_ID);
    const trashItemsToDelete = await mockStorageItemRepository.findAllDescendantsById(rootFolder?.id!, true);

    expect(trashItemsToDelete.length).toBeTruthy();

    const deleteAllInTrashUseCaseUseCase = new DeleteAllInTrashUseCase(mockStorageItemRepository);

    const mockDeleteAllInTrashUseCaseDTO: DeleteAllInTrashRequestDTO = {
      ownerId: TEST_USER_1_ID,
    };

    const responseDTO = await deleteAllInTrashUseCaseUseCase.handle(mockDeleteAllInTrashUseCaseDTO);

    const trashItems = await mockStorageItemRepository.findAllDescendantsById(rootFolder?.id!, true);

    expect(trashItems.length).not.toBeTruthy();
    expect(responseDTO.deletedFiles.length).toBeTruthy();
  });
});
