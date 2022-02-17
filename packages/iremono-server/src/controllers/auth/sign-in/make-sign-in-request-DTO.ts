import { SignInRequestDTO } from '@iremono/backend-core/dist/use-cases/auth/sign-in';
import { HttpRequest } from '../../../shared/controller-lib';

export const makeSignInRequestDTO = ({ body: { email, password } }: HttpRequest): SignInRequestDTO => ({
  email,
  password,
});