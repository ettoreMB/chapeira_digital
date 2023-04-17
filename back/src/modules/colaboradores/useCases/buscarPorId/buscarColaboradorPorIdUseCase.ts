import { IColaboradorRepository } from '@modules/colaboradores/repositories/IColaboradoRepository'
import { AppErrors } from '@shared/errors/AppErros'

export class BuscarColaboradorPorIdUseCase {
  constructor(private colaboradorRepository: IColaboradorRepository) {}

  async execute(id: number) {
    const colaborador = await this.colaboradorRepository.buscarPorId(id)

    if (!colaborador) {
      throw new AppErrors('Colaborador não encontrado', 404)
    }

    const response = {
      id: colaborador.Id,
      nome: colaborador.Nome,
      universo: colaborador.tb_universos?.Universo,
      idUniverso: colaborador.Id_Universo,
      email: colaborador.Email,
      telefone: colaborador.Telefone,
      endereco: colaborador.Endereco,
      tipo: colaborador.Tipo,
      empresa: colaborador.Empresa,
      brigadista: colaborador.Brigadista,
      formacaoData: colaborador.Formacao_Data,
      admissaoData: colaborador.Admissao_Data,
      observacao: colaborador.Observacao,
      administrador: colaborador.Administrador,
    }

    return response
  }
}
