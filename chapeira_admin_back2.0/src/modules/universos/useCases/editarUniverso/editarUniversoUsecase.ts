import { EditarUniversoDTO } from '@modules/universos/dto'
import { IUniversoRepository } from '@modules/universos/repositories/IUniversoRepository'
import { AppErrors } from '@shared/errors/AppErros'

export class EditarUniversoUsecase {
  constructor(private universosRepository: IUniversoRepository) {}
  async execute({
    id,
    Universo,
    Zona,
    Andar,
  }: EditarUniversoDTO): Promise<void> {
    const universo = await this.universosRepository.buscarPorId(id)

    if (!universo) {
      throw new AppErrors('Universo não encontrado', 404)
    }

    universo.Universo = Universo
    universo.Zona = Zona
    universo.Andar = Andar

    await this.universosRepository.editar(universo)
  }
}
