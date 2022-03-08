import { config } from '../config';
import {
  constructMockUserRepository,
  constructMockStorageItemRepository,
  MysqlUserRepository,
  MysqlStorageItemRepository,
  SqliteUserRepository,
  SqliteStorageItemRepository,
  DatabaseType,
} from '@iremono/backend-core/dist/infra/data-access';
import {
  constructBcryptService,
  constructCryptoService,
  constructTokenService,
} from '@iremono/backend-core/dist/infra/services';
import {
  CheckAuthUseCase,
  CreateFolderUseCase,
  CreateRootFolderUseCase,
  DeleteAllInTrashUseCase,
  DeleteFileInTrashUseCase,
  DeleteFolderInTrashUseCase,
  DownloadFileThumbnailUseCase,
  DownloadFileUseCase,
  GetFileTokenUseCase,
  GetFolderUseCase,
  ListAllAncestorsUseCase,
  ListItemsInFolderUseCase,
  ListItemsInTrashUseCase,
  RefreshTokenUseCase,
  RemoveFileUseCase,
  RemoveFolderUseCase,
  RestoreFileUseCase,
  RestoreFolderUseCase,
  SignInUseCase,
  SignOutUseCase,
  SignUpUseCase,
  StreamVideoUseCase,
  UpdateFileUseCase,
  UpdateFolderUseCase,
  UploadFileUseCase,
  VerifyClientEncryptionKeyUseCase,
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
  GetFolderController,
  ListAllAncestorsController,
  StreamVideoController,
  RefreshTokenController,
  GetFileTokenController,
  SignOutController,
  CreateRootFolderController,
  VerifyClientEncryptionKeyController,
} from '../controllers';
import { loggerFactory } from '../shared/utils/logger';

const repositories = {
  userRepository: [
    { dbType: DatabaseType.MYSQL, repository: new MysqlUserRepository(loggerFactory) },
    { dbType: DatabaseType.SQLITE, repository: new SqliteUserRepository(loggerFactory) },
  ],
  storageItemRepository: [
    { dbType: DatabaseType.MYSQL, repository: new MysqlStorageItemRepository(loggerFactory) },
    { dbType: DatabaseType.SQLITE, repository: new SqliteStorageItemRepository(loggerFactory) },
  ],
};

export const userRepository =
  repositories.userRepository.find((repo) => repo.dbType === config.dbConfig.DB_TYPE)?.repository ||
  constructMockUserRepository(loggerFactory);

const storageItemRepository =
  repositories.storageItemRepository.find((repo) => repo.dbType === config.dbConfig.DB_TYPE)?.repository ||
  constructMockStorageItemRepository(loggerFactory);

const bcryptService = constructBcryptService();
export const tokenService = constructTokenService({
  jwtSecretForAccessToken: config.tokenConfig.JWT_SECRET_FOR_ACCESS_TOKEN,
  jwtExpiresInForAccessToken: config.tokenConfig.JWT_EXPIRE_IN_FOR_ACCESS_TOKEN,
  expiresInForRefreshToken: config.tokenConfig.EXPIRE_IN_FOR_REFRESH_TOKEN,
  expiresInForDownloadFileToken: config.tokenConfig.EXPIRE_IN_FOR_DOWNLOAD_FILE_TOKEN,
  expiresInForStreamFileToken: config.tokenConfig.EXPIRE_IN_FOR_STREAM_FILE_TOKEN,
});
export const cryptoService = constructCryptoService();

// User
const signUpUseCase = new SignUpUseCase(
  userRepository,
  tokenService,
  bcryptService,
  new CreateRootFolderUseCase(storageItemRepository, bcryptService),
);
const signInUseCase = new SignInUseCase(userRepository, tokenService, bcryptService);
const signOutUseCase = new SignOutUseCase(tokenService);
const checkAuthUseCase = new CheckAuthUseCase(userRepository);
const refreshTokenUseCase = new RefreshTokenUseCase(tokenService);

export const signUpController = new SignUpController(signUpUseCase, loggerFactory);
export const signInController = new SignInController(signInUseCase, loggerFactory);
export const signOutController = new SignOutController(signOutUseCase, loggerFactory);
export const checkAuthController = new CheckAuthController(checkAuthUseCase, loggerFactory);
export const refreshTokenController = new RefreshTokenController(refreshTokenUseCase, loggerFactory);

// folders
const createFolderUseCase = new CreateFolderUseCase(storageItemRepository);
const createRootFolderUseCase = new CreateRootFolderUseCase(storageItemRepository, bcryptService);
const verifyClientEncryptionKeyUseCase = new VerifyClientEncryptionKeyUseCase(storageItemRepository, bcryptService);
const updateFolderUseCase = new UpdateFolderUseCase(storageItemRepository);
const removeFolderUseCase = new RemoveFolderUseCase(storageItemRepository);
const restoreFolderUseCase = new RestoreFolderUseCase(storageItemRepository);
const listItemsInFolderUserCase = new ListItemsInFolderUseCase(storageItemRepository);
const getFolderUserCase = new GetFolderUseCase(storageItemRepository);
const listAllAncestorsUserCase = new ListAllAncestorsUseCase(storageItemRepository);

export const createFolderController = new CreateFolderController(createFolderUseCase, loggerFactory);
export const createRootFolderController = new CreateRootFolderController(createRootFolderUseCase, loggerFactory);
export const verifyClientEncryptionKeyController = new VerifyClientEncryptionKeyController(
  verifyClientEncryptionKeyUseCase,
  loggerFactory,
);
export const updateFolderController = new UpdateFolderController(updateFolderUseCase, loggerFactory);
export const removeFolderController = new RemoveFolderController(removeFolderUseCase, loggerFactory);
export const restoreFolderController = new RestoreFolderController(restoreFolderUseCase, loggerFactory);
export const listItemsInFolderController = new ListItemsInFolderController(listItemsInFolderUserCase, loggerFactory);
export const getFolderController = new GetFolderController(getFolderUserCase, loggerFactory);
export const listAllAncestorsController = new ListAllAncestorsController(listAllAncestorsUserCase, loggerFactory);

// files
const uploadFileUseCase = new UploadFileUseCase(storageItemRepository);
const downloadFileUseCase = new DownloadFileUseCase(storageItemRepository, tokenService);
const getFileTokenUseCase = new GetFileTokenUseCase(storageItemRepository, tokenService);
const downloadFileThumbnailUseCase = new DownloadFileThumbnailUseCase(storageItemRepository);
const updateFileUseCase = new UpdateFileUseCase(storageItemRepository);
const removeFileUseCase = new RemoveFileUseCase(storageItemRepository);
const restoreFileUseCase = new RestoreFileUseCase(storageItemRepository);
const streamVideoUseCase = new StreamVideoUseCase(storageItemRepository, tokenService);

export const uploadFileController = new UploadFileController(uploadFileUseCase, loggerFactory);
export const downloadFileController = new DownloadFileController(downloadFileUseCase, cryptoService, loggerFactory);
export const getFileTokenController = new GetFileTokenController(getFileTokenUseCase, loggerFactory);
export const downloadFileThumbnailController = new DownloadFileThumbnailController(
  downloadFileThumbnailUseCase,
  cryptoService,
  loggerFactory,
);
export const updateFileController = new UpdateFileController(updateFileUseCase, loggerFactory);
export const removeFileController = new RemoveFileController(removeFileUseCase, loggerFactory);
export const restoreFileController = new RestoreFileController(restoreFileUseCase, loggerFactory);
export const streamVideoController = new StreamVideoController(streamVideoUseCase, cryptoService, loggerFactory);

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
