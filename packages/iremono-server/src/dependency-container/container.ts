import {
  constructMockIdentityRepository,
  constructMockStorageItemRepository,
} from '@iremono/backend-core/src/infra/data-access';
import { constructBcryptService, constructJwtService } from '@iremono/backend-core/src/infra/services';
import {
  CheckIdentityUseCase,
  CreateFolderUseCase,
  ListItemsInFolderUseCase,
  RemoveFolderUseCase,
  RestoreFolderUseCase,
  SignInUseCase,
  SignUpUseCase,
  UpdateFileUseCase,
  UpdateFolderUseCase,
  UploadFileUseCase,
} from '@iremono/backend-core/src/use-cases';
import { config } from '../config';
import { UpdateFileController, UploadFileController } from '../controllers/files';
import {
  CreateFolderController,
  ListItemsInFolderController,
  RemoveFolderController,
  RestoreFolderController,
  UpdateFolderController,
} from '../controllers/folders';
import { CheckIdentityController, SignInController, SignUpController } from '../controllers/identity';
import { loggerFactory } from '../shared/utils/logger';

// TODO: replace it once the real repository gets ready
const identityRepository = constructMockIdentityRepository(loggerFactory);
const storageItemRepository = constructMockStorageItemRepository(loggerFactory);

const bcryptService = constructBcryptService();
export const jwtService = constructJwtService({
  jwtSecret: config.jwtConfig.JWT_SECRET,
  jwtExpiresIn: config.jwtConfig.JWT_EXPIRE_IN,
});

const signUpUseCase = new SignUpUseCase(identityRepository, storageItemRepository, jwtService, bcryptService);
const signInUseCase = new SignInUseCase(identityRepository, jwtService, bcryptService);
const checkIdentityUseCase = new CheckIdentityUseCase(identityRepository);

export const signUpController = new SignUpController(signUpUseCase, loggerFactory);
export const signInController = new SignInController(signInUseCase, loggerFactory);
export const checkIdentityController = new CheckIdentityController(checkIdentityUseCase, loggerFactory);

const createFolderUseCase = new CreateFolderUseCase(storageItemRepository);
const updateFolderUseCase = new UpdateFolderUseCase(storageItemRepository);
const removeFolderUseCase = new RemoveFolderUseCase(storageItemRepository);
const restoreFolderUseCase = new RestoreFolderUseCase(storageItemRepository);
const listItemsInFolderUserCase = new ListItemsInFolderUseCase(storageItemRepository);

export const createFolderController = new CreateFolderController(createFolderUseCase, loggerFactory);
export const updateFolderController = new UpdateFolderController(updateFolderUseCase, loggerFactory);
export const removeFolderController = new RemoveFolderController(removeFolderUseCase, loggerFactory);
export const restoreFolderController = new RestoreFolderController(restoreFolderUseCase, loggerFactory);
export const listItemsInFolderController = new ListItemsInFolderController(listItemsInFolderUserCase, loggerFactory);

const uploadFileUseCase = new UploadFileUseCase(storageItemRepository);
const updateFileUseCase = new UpdateFileUseCase(storageItemRepository);

export const uploadFileController = new UploadFileController(uploadFileUseCase, loggerFactory);
export const updateFileController = new UpdateFileController(updateFileUseCase, loggerFactory);
