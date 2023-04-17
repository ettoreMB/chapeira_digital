import { IColaboradorRepository } from '@modules/colaboradores/repositories/IColaboradoRepository'
import { IUniversoRepository } from '@modules/universos/repositories/IUniversoRepository'
import { AppErrors } from '@shared/errors/AppErros'

export class DeletarUniversoUsecase {
  constructor(
    private universoRepository: IUniversoRepository,
    private colaboradoresRepository: IColaboradorRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const universo = await this.universoRepository.buscarPorId(id)
    // Checar se tem usuarios no universo

    if (!universo) {
      throw new AppErrors('universo não encontrado', 400)
    }

    const existeColaboradores =
      await this.colaboradoresRepository.listarColaboradoresPorTipoOuUniverso({
        universoId: universo.Id,
      })

    if (existeColaboradores.length > 0) {
      throw new AppErrors('Existem colaboradores nesse universo', 409)
    }
    await this.universoRepository.deletar(universo.Id)
  }
}
