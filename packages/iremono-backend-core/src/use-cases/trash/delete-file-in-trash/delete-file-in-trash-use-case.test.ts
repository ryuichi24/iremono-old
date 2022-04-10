import crypto from 'crypto';
import { StorageItem } from '../../../entities';
import { constructMockStorageItemRepository } from '../../../infra/data-access/mock/repositories/mock-storage-item-repository';
import { DeleteFileInTrashRequestDTO } from './contracts';
import { DeleteFileInTrashUseCase } from './delete-file-in-trash-use-case';

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

describe('test DeleteFileInTrashUseCase handle method', () => {
  it('should delete one item in trash and return the deleted item', async () => {
    const trashItemToDelete = await mockStorageItemRepository.findOneById(TEST_FILE_1_ID);
    expect(trashItemToDelete).toBeTruthy();

    const deleteFileInTrashUseCaseUseCase = new DeleteFileInTrashUseCase(mockStorageItemRepository);

    const mockDeleteFileInTrashUseCaseDTO: DeleteFileInTrashRequestDTO = {
      ownerId: TEST_USER_1_ID,
      id: trashItemToDelete?.id!,
    };

    const responseDTO = await deleteFileInTrashUseCaseUseCase.handle(mockDeleteFileInTrashUseCaseDTO);

    const trashItem = await mockStorageItemRepository.findOneById(TEST_FILE_1_ID);
    expect(trashItem).not.toBeTruthy();
    expect(responseDTO.deletedFile).toBeTruthy();
  });
});
