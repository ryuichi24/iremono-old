import { SignInRequestDTO } from '@iremono/backend-core/src/use-cases/identity/sign-in';
import { HttpRequest } from '../../../shared/controller-lib';

export const makeSignInRequestDTO = ({ body: { email, password } }: HttpRequest): SignInRequestDTO => ({
  email,
  password,
});
