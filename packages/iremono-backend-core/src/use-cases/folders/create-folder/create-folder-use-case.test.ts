import crypto from 'crypto';
import { StorageItem } from '../../../entities';
import { constructMockStorageItemRepository } from '../../../infra/data-access/mock/repositories/mock-storage-item-repository';
import { CreateFolderRequestDTO } from './contracts';
import { CreateFolderUseCase } from './create-folder-use-case';

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

describe('test CreateFolderUseCase handle method', () => {
  it('should create new folder item and return the create item', async () => {
    const createFolderUseCase = new CreateFolderUseCase(mockStorageItemRepository);

    const mockCreateFolderDTO: CreateFolderRequestDTO = {
      name: 'test folder name',
      parentId: TEST_FOLDER_1_ID,
      ownerId: TEST_USER_1_ID,
    };

    const responseDTO = await createFolderUseCase.handle(mockCreateFolderDTO);
    const createdItem = await mockStorageItemRepository.findOneById(responseDTO.id!);

    expect(createdItem).toBeTruthy();
    expect(createdItem?.isFolder).toBe(true);
    expect(responseDTO).toBeTruthy();
    expect(responseDTO?.isFolder).toBe(true);
  });
});
