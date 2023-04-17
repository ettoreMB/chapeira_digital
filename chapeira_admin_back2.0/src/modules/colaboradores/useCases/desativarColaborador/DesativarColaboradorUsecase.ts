import { DesativarColaboradorDto } from '@modules/colaboradores/dto'
import { IColaboradorRepository } from '@modules/colaboradores/repositories/IColaboradoRepository'
import { AppErrors } from '@shared/errors/AppErros'

export class DesativarColaboradorUsecase {
  constructor(private colaboradorRepository: IColaboradorRepository) {}

  async execute(id: number): Promise<void> {
    const colaborador = await this.colaboradorRepository.buscarPorId(id)

    if (!colaborador) {
      throw new AppErrors('colaborador não encontrado', 404)
    }
    try {
      const data: DesativarColaboradorDto = {
        Ativo: 'Nao',
        Id_Universo: null,
        Administrador: 'Nao',
        CheckIn: 0,
        Status: colaborador.Status === 'Presente' ? 'Presente' : 'Presente',
        CheckIn_Status:
          colaborador.Status === 'Presente' ? 'Presente' : 'Presente',
        Senha: 'AcessoBloqueado',
        Acao: 'Check In',
        Cor: 'danger',
      }
      await this.colaboradorRepository.desativarColaborador(
        colaborador.Id,
        data,
      )
    } catch (error) {
      console.error(error)
      throw new AppErrors('Erro ao desativar o colaborador', 500)
    }
  }
}
