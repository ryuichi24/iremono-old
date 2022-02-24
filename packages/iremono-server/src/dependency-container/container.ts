import { config } from '../config';
import {
  constructMockUserRepository,
  constructMockStorageItemRepository,
  MysqlUserRepository,
} from '@iremono/backend-core/dist/infra/data-access';
import {
  constructBcryptService,
  constructCryptoService,
  constructJwtService,
} from '@iremono/backend-core/dist/infra/services';
import {
  CheckAuthUseCase,
  CreateFolderUseCase,
  DeleteAllInTrashUseCase,
  DeleteFileInTrashUseCase,
  DeleteFolderInTrashUseCase,
  DownloadFileThumbnailUseCase,
  DownloadFileUseCase,
  GetRootFolderUseCase,
  ListItemsInFolderUseCase,
  ListItemsInTrashUseCase,
  RegisterEncryptionKeyUseCase,
  RemoveFileUseCase,
  RemoveFolderUseCase,
  RestoreFileUseCase,
  RestoreFolderUseCase,
  SignInUseCase,
  SignUpUseCase,
  UpdateFileUseCase,
  UpdateFolderUseCase,
  UploadFileUseCase,
} from '@iremono/backend-core/dist/use-cases';
import {
  CreateFolderController,
  ListItemsInFolderController,
  RemoveFolderController,
  RestoreFolderController,
  UpdateFolderController,
  RemoveFileController,
  RestoreFileController,
  UpdateFileController,
  UploadFileController,
  DownloadFileController,
  CheckAuthController,
  SignInController,
  SignUpController,
  DeleteFileInTrashController,
  DeleteFolderInTrashController,
  ListItemsInTrashController,
  DeleteAllInTrashController,
  DownloadFileThumbnailController,
  RegisterEncryptionKeyController,
  GetRootFolderController,
} from '../controllers';
import { loggerFactory } from '../shared/utils/logger';

// TODO: replace it once the real repository gets ready
export const userRepository = constructMockUserRepository(loggerFactory);
// export const userRepository = new MysqlUserRepository(loggerFactory);
const storageItemRepository = constructMockStorageItemRepository(loggerFactory);

const bcryptService = constructBcryptService();
export const jwtService = constructJwtService({
  jwtSecret: config.jwtConfig.JWT_SECRET,
  jwtExpiresIn: config.jwtConfig.JWT_EXPIRE_IN,
});
export const cryptoService = constructCryptoService();

// User
const signUpUseCase = new SignUpUseCase(userRepository, storageItemRepository, jwtService, bcryptService);
const signInUseCase = new SignInUseCase(userRepository, jwtService, bcryptService);
const checkAuthUseCase = new CheckAuthUseCase(userRepository);

export const signUpController = new SignUpController(signUpUseCase, loggerFactory);
export const signInController = new SignInController(signInUseCase, loggerFactory);
export const checkAuthController = new CheckAuthController(checkAuthUseCase, loggerFactory);

// folders
const createFolderUseCase = new CreateFolderUseCase(storageItemRepository);
const updateFolderUseCase = new UpdateFolderUseCase(storageItemRepository);
const removeFolderUseCase = new RemoveFolderUseCase(storageItemRepository);
const restoreFolderUseCase = new RestoreFolderUseCase(storageItemRepository);
const listItemsInFolderUserCase = new ListItemsInFolderUseCase(storageItemRepository);
const getRootFolderUserCase = new GetRootFolderUseCase(storageItemRepository);

export const createFolderController = new CreateFolderController(createFolderUseCase, loggerFactory);
export const updateFolderController = new UpdateFolderController(updateFolderUseCase, loggerFactory);
export const removeFolderController = new RemoveFolderController(removeFolderUseCase, loggerFactory);
export const restoreFolderController = new RestoreFolderController(restoreFolderUseCase, loggerFactory);
export const listItemsInFolderController = new ListItemsInFolderController(listItemsInFolderUserCase, loggerFactory);
export const getRootFolderController = new GetRootFolderController(getRootFolderUserCase, loggerFactory);

// files
const uploadFileUseCase = new UploadFileUseCase(storageItemRepository);
const downloadFileUseCase = new DownloadFileUseCase(storageItemRepository, userRepository);
const downloadFileThumbnailUseCase = new DownloadFileThumbnailUseCase(storageItemRepository, userRepository);
const updateFileUseCase = new UpdateFileUseCase(storageItemRepository);
const removeFileUseCase = new RemoveFileUseCase(storageItemRepository);
const restoreFileUseCase = new RestoreFileUseCase(storageItemRepository);

export const uploadFileController = new UploadFileController(uploadFileUseCase, loggerFactory);
export const downloadFileController = new DownloadFileController(downloadFileUseCase, cryptoService, loggerFactory);
export const downloadFileThumbnailController = new DownloadFileThumbnailController(
  downloadFileThumbnailUseCase,
  cryptoService,
  loggerFactory,
);
export const updateFileController = new UpdateFileController(updateFileUseCase, loggerFactory);
export const removeFileController = new RemoveFileController(removeFileUseCase, loggerFactory);
export const restoreFileController = new RestoreFileController(restoreFileUseCase, loggerFactory);

// trash
const deleteFileInTrashUseCase = new DeleteFileInTrashUseCase(storageItemRepository);
const deleteFolderInTrashUseCase = new DeleteFolderInTrashUseCase(storageItemRepository);
const listItemsInTrashUseCase = new ListItemsInTrashUseCase(storageItemRepository);
const deleteAllInTrashUseCase = new DeleteAllInTrashUseCase(storageItemRepository);

export const deleteFileInTrashController = new DeleteFileInTrashController(deleteFileInTrashUseCase, loggerFactory);
export const deleteFolderInTrashController = new DeleteFolderInTrashController(
  deleteFolderInTrashUseCase,
  loggerFactory,
);
export const listItemsInTrashController = new ListItemsInTrashController(listItemsInTrashUseCase, loggerFactory);
export const deleteAllInTrashController = new DeleteAllInTrashController(deleteAllInTrashUseCase, loggerFactory);

// security
const registerEncryptionKeyUseCase = new RegisterEncryptionKeyUseCase(userRepository);

export const registerEncryptionKeyController = new RegisterEncryptionKeyController(
  registerEncryptionKeyUseCase,
  cryptoService,
  loggerFactory,
);
