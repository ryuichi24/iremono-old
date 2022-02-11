import { constructMockIdentityRepository, constructMockStorageItemRepository } from "@iremono/backend-core/src/infra/data-access";
import { constructBcryptService, constructJwtService } from "@iremono/backend-core/src/infra/services";
import { CheckIdentityUseCase, CreateFolderUseCase, SignInUseCase, SignUpUseCase } from "@iremono/backend-core/src/use-cases";
import { config } from "../config";
import { CreateFolderController } from "../controllers/folders";
import { CheckIdentityController, SignInController, SignUpController } from "../controllers/identity";
import { loggerFactory } from "../shared/utils/logger";

// TODO: replace it once the real repository gets ready
const identityRepository = constructMockIdentityRepository();
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

export const createFolderController = new CreateFolderController(createFolderUseCase, loggerFactory);