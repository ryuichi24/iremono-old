import crypto from 'crypto';
import { StorageItem } from '../../../entities';
import { constructMockStorageItemRepository } from '../../../infra/data-access/mock/repositories/mock-storage-item-repository';
import { UpdateFolderRequestDTO } from './contracts';
import { UpdateFolderUseCase } from './update-folder-use-case';

const TEST_USER_1_ID = crypto.randomUUID();
const TEST_ROOT_FOLDER_1_ID = crypto.randomUUID();
const TEST_FOLDER_1_ID = crypto.randomUUID();
const TEST_FOLDER_2_ID = crypto.randomUUID();
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
    { name: 'test folder 2', isFolder: true, ownerId: TEST_USER_1_ID, parentId: TEST_ROOT_FOLDER_1_ID },
    TEST_FOLDER_2_ID,
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

describe('test UpdateFolderUseCase handle method', () => {
  it('should update folder name', async () => {
    const NEW_FOLDER_NAME = 'test folder 1 updated';
    const folderItemToUpdate = await mockStorageItemRepository.findOneById(TEST_FOLDER_1_ID);
    expect(folderItemToUpdate?.name).not.toBe(NEW_FOLDER_NAME);

    const updateFolderUseCase = new UpdateFolderUseCase(mockStorageItemRepository);

    const mockUpdateFolderDTO: UpdateFolderRequestDTO = {
      id: TEST_FOLDER_1_ID,
      name: NEW_FOLDER_NAME,
      ownerId: TEST_USER_1_ID,
    };

    const responseDTO = await updateFolderUseCase.handle(mockUpdateFolderDTO);

    const updatedFolderItem = await mockStorageItemRepository.findOneById(TEST_FOLDER_1_ID);

    expect(responseDTO.name).toBe(NEW_FOLDER_NAME);
    expect(updatedFolderItem?.name).toBe(NEW_FOLDER_NAME);
  });
});
