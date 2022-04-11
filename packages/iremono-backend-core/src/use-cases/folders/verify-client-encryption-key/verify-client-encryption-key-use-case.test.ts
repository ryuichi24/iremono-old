import crypto from 'crypto';
import { jest } from '@jest/globals';
import { StorageItem } from '../../../entities';
import { constructMockStorageItemRepository } from '../../../infra/data-access/mock/repositories/mock-storage-item-repository';
import { HashService } from '../../../services/hash-service';
import { VerifyClientEncryptionKeyRequestDTO } from './contracts';
import { VerifyClientEncryptionKeyUseCase } from './verify-client-encryption-key-use-case';
import { InvalidRequestError } from '../../../shared/utils/errors/invalid-request-error';

const TEST_USER_1_ID = crypto.randomUUID();
const TEST_ROOT_FOLDER_1_ID = crypto.randomUUID();
const TEST_FOLDER_1_ID = crypto.randomUUID();
const TEST_FOLDER_2_ID = crypto.randomUUID();
const TEST_FILE_1_ID = crypto.randomUUID();

const mockItems = [
  new StorageItem(
    {
      name: 'test root folder',
      isFolder: true,
      ownerId: TEST_USER_1_ID,
      parentId: null,
      isRootFolder: true,
      isCryptoFolderItem: true,
    },
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

describe('test VerifyClientEncryptionKeyUseCase handle method', () => {
  it('should verify client encryption key', async () => {
    const mockHashService: HashService = {
      hash: jest.fn(async (value: string): Promise<string> => {
        return crypto.createHash('sha256').update('random-test-key').digest().toString();
      }),
      compare: jest.fn(async (plainText: string, hashedText: string): Promise<boolean> => {
        return true;
      }),
    };

    const verifyClientEncryptionKeyUseCase = new VerifyClientEncryptionKeyUseCase(
      mockStorageItemRepository,
      mockHashService,
    );

    const mockVerifyClientEncryptionKeyDTO: VerifyClientEncryptionKeyRequestDTO = {
      ownerId: TEST_USER_1_ID,
      clientEncryptionKey: 'valid-client-key',
    };

    // https://stackoverflow.com/questions/49603338/how-to-test-an-exception-was-not-thrown-with-jest
    await expect(verifyClientEncryptionKeyUseCase.handle(mockVerifyClientEncryptionKeyDTO)).resolves.not.toThrowError();
  });

  it('should reject invalid client encryption key', async () => {
    const mockHashService: HashService = {
      hash: jest.fn(async (value: string): Promise<string> => {
        return crypto.createHash('sha256').update('random-test-key').digest().toString();
      }),
      compare: jest.fn(async (plainText: string, hashedText: string): Promise<boolean> => {
        return false;
      }),
    };

    const verifyClientEncryptionKeyUseCase = new VerifyClientEncryptionKeyUseCase(
      mockStorageItemRepository,
      mockHashService,
    );

    const mockVerifyClientEncryptionKeyDTO: VerifyClientEncryptionKeyRequestDTO = {
      ownerId: TEST_USER_1_ID,
      clientEncryptionKey: 'invalid-client-key',
    };

    // https://stackoverflow.com/questions/47144187/can-you-write-async-tests-that-expect-tothrow
    await expect(async () => {
      await verifyClientEncryptionKeyUseCase.handle(mockVerifyClientEncryptionKeyDTO);
    }).rejects.toThrowError(new InvalidRequestError('Invalid client encryption key is provided.'));
  });
});
