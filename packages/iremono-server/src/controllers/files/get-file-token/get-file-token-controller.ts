import { GetFileTokenRequestDTO, GetFileTokenUseCase } from '@iremono/backend-core/dist/use-cases';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class GetFileTokenController extends Controller<GetFileTokenUseCase> {
  constructor(useCase: GetFileTokenUseCase) {
    super(useCase);
  }

  async handle({ params, query, user }: HttpRequest): Promise<HttpResponse> {
    const dto: GetFileTokenRequestDTO = {
      ownerId: user?.id,
      id: params?.id,
      tokenType: query?.type,
    };

    const result = await this._useCase.handle(dto);

    return this._ok(result);
  }
}
