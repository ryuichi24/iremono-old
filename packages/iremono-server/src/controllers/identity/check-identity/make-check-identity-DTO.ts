import { CheckIdentityRequestDTO } from '@iremono/backend-core/src/use-cases/identity/check-identity';
import { HttpRequest } from '../../../shared/controller-lib';

export const makeCheckIdentityRequestDTO = ({ user: { id } }: HttpRequest): CheckIdentityRequestDTO => ({
  id,
});
