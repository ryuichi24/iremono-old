export interface UseCase<TRequestDTO, TResponseDTO> {
  handle(dto: TRequestDTO): Promise<TResponseDTO>;
}
