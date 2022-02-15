import { CheckIdentityRequestDTO } from '@iremono/backend-core/dist/use-cases/identity/check-identity';
import { HttpRequest } from '../../../shared/controller-lib';

export const makeCheckIdentityRequestDTO = ({ user: { id } }: HttpRequest): CheckIdentityRequestDTO => ({
  id,
});
