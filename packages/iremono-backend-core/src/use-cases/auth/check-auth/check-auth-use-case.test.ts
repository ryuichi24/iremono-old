import crypto from 'crypto';
import { constructMockUserRepository } from '../../../infra/data-access/mock/repositories/mock-user-repository';
import { CheckAuthRequestDTO } from './contracts';
import { CheckAuthUseCase } from './check-auth-use-case';
import { User } from '../../../entities';

const TEST_USER_1_ID = crypto.randomUUID();
const TEST_USER_2_ID = crypto.randomUUID();

const mockItems = [
  new User(
    {
      email: 'test1@example.com',
      password: '',
    },
    TEST_USER_1_ID,
  ),
  new User(
    {
      email: 'test2@example.com',
      password: '',
    },
    TEST_USER_2_ID,
  ),
];

const mockUserRepository = constructMockUserRepository();

beforeEach(async () => {
  for (const item of mockItems) {
    await mockUserRepository.save(item);
  }
});

afterEach(async () => {
  for (const item of mockItems) {
    // await mockUserRepository.remove(item);
  }
});

describe('test CheckAuthUseCase handle method', () => {
  it('should return authorized user', async () => {
    const checkAuthUseCase = new CheckAuthUseCase(mockUserRepository);

    const mockCheckAuthDTO: CheckAuthRequestDTO = {
      id: TEST_USER_1_ID,
    };

    const responseDTO = await checkAuthUseCase.handle(mockCheckAuthDTO);

    expect(responseDTO.id).toBe(TEST_USER_1_ID);
  });
});
