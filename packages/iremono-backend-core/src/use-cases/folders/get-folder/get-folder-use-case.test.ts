import crypto from 'crypto';
import { StorageItem } from '../../../entities';
import { constructMockStorageItemRepository } from '../../../infra/data-access/mock/repositories/mock-storage-item-repository';
import { GetFolderRequestDTO } from './contracts';
import { GetFolderUseCase } from './get-folder-use-case';

const TEST_USER_1_ID = crypto.randomUUID();
const TEST_ROOT_FOLDER_1_ID = crypto.randomUUID();
const TEST_FOLDER_1_ID = crypto.randomUUID();

const mockItems = [
  new StorageItem(
    { name: 'test root folder', isFolder: true, ownerId: TEST_USER_1_ID, parentId: null, isRootFolder: true },
    TEST_ROOT_FOLDER_1_ID,
  ),
  new StorageItem(
    { name: 'test folder 1', isFolder: true, ownerId: TEST_USER_1_ID, parentId: TEST_ROOT_FOLDER_1_ID },
    TEST_FOLDER_1_ID,
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

describe('test GetFolderUseCase handle method', () => {
  it('should return the folder item', async () => {
    const getFolderUseCase = new GetFolderUseCase(mockStorageItemRepository);

    const mockGetFolderDTO: GetFolderRequestDTO = {
      ownerId: TEST_USER_1_ID,
      id: TEST_FOLDER_1_ID,
      folderType: 'normal',
    };

    const responseDTO = await getFolderUseCase.handle(mockGetFolderDTO);

    expect(responseDTO).toBeTruthy();
    expect(responseDTO?.isFolder).toBe(true);
  });
});
