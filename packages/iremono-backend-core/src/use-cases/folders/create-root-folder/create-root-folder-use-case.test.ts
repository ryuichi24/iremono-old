import crypto from 'crypto';
import { jest } from '@jest/globals';
import { constructMockStorageItemRepository } from '../../../infra/data-access/mock/repositories/mock-storage-item-repository';
import { HashService } from '../../../services';
import { CreateRootFolderRequestDTO } from './contracts';
import { CreateRootFolderUseCase } from './create-root-folder-use-case';

const TEST_USER_1_ID = crypto.randomUUID();

const mockStorageItemRepository = constructMockStorageItemRepository();

beforeEach(async () => {});

afterEach(async () => {});

describe('test CreateRootFolderUseCase handle method', () => {
  it('should create new root folder item and return the create item', async () => {
    const mockDownloadFileTokenService: HashService = {
      hash: jest.fn(async (value: string): Promise<string> => {
        return crypto.createHash('sha256').update('random-test-key').digest().toString();
      }),
      compare: jest.fn(async (plainText: string, hashedText: string): Promise<boolean> => {
        return true;
      }),
    };

    const createRootFolderUseCase = new CreateRootFolderUseCase(
      mockStorageItemRepository,
      mockDownloadFileTokenService,
    );

    const mockCreateRootFolderDTO: CreateRootFolderRequestDTO = {
      name: 'test folder name',
      ownerId: TEST_USER_1_ID,
      folderType: 'normal',
      clientEncryptionKey: '',
    };

    const responseDTO = await createRootFolderUseCase.handle(mockCreateRootFolderDTO);
    const createdItem = await mockStorageItemRepository.findOneById(responseDTO.id!);

    expect(createdItem).toBeTruthy();
    expect(createdItem?.isFolder).toBe(true);
    expect(createdItem?.isRootFolder).toBe(true);
    expect(responseDTO).toBeTruthy();
    expect(responseDTO?.isFolder).toBe(true);
    expect(responseDTO?.isRootFolder).toBe(true);
  });
});
