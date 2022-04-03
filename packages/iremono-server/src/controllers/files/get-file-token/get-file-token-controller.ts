import { IGetFileTokenUseCase } from '@iremono/backend-core/dist/use-cases/files/get-file-token/contracts';
import { Controller, HttpRequest, HttpResponse } from '../../../shared/controller-lib';

export class GetFileTokenController extends Controller<IGetFileTokenUseCase> {
  constructor(useCase: IGetFileTokenUseCase) {
    super(useCase);
  }

  async handle({ params, query, user }: HttpRequest): Promise<HttpResponse> {
    const result = await this._useCase.handle({
      ownerId: user?.id,
      id: params?.id,
      tokenType: query?.type,
    });

    return this._ok(result);
  }
}
