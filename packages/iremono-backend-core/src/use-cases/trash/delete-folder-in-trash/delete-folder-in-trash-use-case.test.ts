import crypto from 'crypto';
import { StorageItem } from '../../../entities';
import { constructMockStorageItemRepository } from '../../../infra/data-access/mock/repositories/mock-storage-item-repository';
import { DeleteFolderInTrashRequestDTO } from './contracts';
import { DeleteFolderInTrashUseCase } from './delete-folder-in-trash-use-case';

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
    TEST_FILE_2_ID,
  ),
  new StorageItem(
    { name: 'test file 3', isFolder: false, ownerId: TEST_USER_1_ID, parentId: TEST_FOLDER_1_ID, isInTrash: true },
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

describe('test DeleteFolderInTrashUseCase handle method', () => {
  it('should delete one folder item and its descendants in trash return the deleted file items', async () => {
    const folderTrashItemToDelete = await mockStorageItemRepository.findOneById(TEST_FOLDER_1_ID);
    expect(folderTrashItemToDelete).toBeTruthy();

    const trashItemsToDelete = await mockStorageItemRepository.findAllDescendantsById(
      folderTrashItemToDelete?.id!,
      true,
    );
    expect(trashItemsToDelete.length).toBeTruthy();

    const deleteFolderInTrashUseCaseUseCase = new DeleteFolderInTrashUseCase(mockStorageItemRepository);

    const mockDeleteFolderInTrashUseCaseDTO: DeleteFolderInTrashRequestDTO = {
      ownerId: TEST_USER_1_ID,
      id: TEST_FOLDER_1_ID,
    };

    const responseDTO = await deleteFolderInTrashUseCaseUseCase.handle(mockDeleteFolderInTrashUseCaseDTO);

    const folderTrashItem = await mockStorageItemRepository.findOneById(TEST_FOLDER_1_ID);
    expect(folderTrashItem).not.toBeTruthy();

    const trashItems = await mockStorageItemRepository.findAllDescendantsById(TEST_FOLDER_1_ID, true);
    expect(trashItems.length).not.toBeTruthy();

    expect(responseDTO.deletedFiles.length).toBeTruthy();
  });
});
