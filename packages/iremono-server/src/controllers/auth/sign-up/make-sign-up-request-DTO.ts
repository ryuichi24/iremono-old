import { SignUpRequestDTO } from '@iremono/backend-core/dist/use-cases/auth/sign-up';
import { HttpRequest } from '../../../shared/controller-lib';

export const makeSignUpRequestDTO = ({ body: { email, password } }: HttpRequest): SignUpRequestDTO => ({
  email,
  password,
});
