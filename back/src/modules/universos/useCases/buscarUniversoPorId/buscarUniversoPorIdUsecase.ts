import { IUniversoRepository } from '@modules/universos/repositories/IUniversoRepository'
import { AppErrors } from '@shared/errors/AppErros'

export class BuscarUniversoPorIdUSecase {
  constructor(private univesoRepository: IUniversoRepository) {}

  async execute(id: number) {
    const universo = await this.univesoRepository.buscarPorId(id)

    if (!universo) {
      throw new AppErrors('Universo não encontrado', 404)
    }

    return universo
  }
}
