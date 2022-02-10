export interface UseCase<TRequestDTO = any, TResponseDTO = any> {
  handle(dto: TRequestDTO): Promise<TResponseDTO>;
}
