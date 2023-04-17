import { IColaboradorRepository } from '@modules/colaboradores/repositories/IColaboradoRepository'
import { ILojaInterface } from '@modules/lojas/repositories/IlojaRepository'

import { AppErrors } from '@shared/errors/AppErros'

interface IReqParamsn {
  nome: string
  universoId?: number
  tipo?: string
}

export class ListarColaboradoresUseCase {
  constructor(
    private colaboradoresRepository: IColaboradorRepository,
    private lojaRepository: ILojaInterface,
  ) {}

  async execute({ nome, universoId, tipo }: IReqParamsn) {
    const loja = await this.lojaRepository.buscarPorSiglaOuNome(nome)

    if (!loja) {
      throw new AppErrors('Loja nao encontrada no sistema', 404)
    }
    const colaboradores =
      await this.colaboradoresRepository.listarColaboradoresPorTipoOuUniverso({
        sigla: loja.Loja_Sigla,
        tipo: tipo || null,
        universoId: universoId || null,
      })

    // const response = colaborares?.map((colaborador: any) => {
    //   return {
    //     id: colaborador.Id,
    //     ativo: colaborador.Ativo,
    //     lojaSigla: colaborador.Loja_Sigla,
    //     nome: colaborador.Nome,
    //     tipo: colaborador.Tipo,
    //     empresa: colaborador.Empresa,
    //     brigadista: colaborador.Brigadista,
    //     formacaoData: colaborador.Formacao_Data,
    //     observacao: colaborador.Observacao,
    //     administrador: colaborador.Administrador,
    //     status: colaborador.Status,
    //     checkIn: colaborador.CheckIn,
    //     checkIn_Date: colaborador.CheckIn_Date,
    //     checkIn_Status: colaborador.CheckIn_Status,
    //     universo: colaborador.tb_universos.Universo,
    //     universoId: colaborador.tb_universos.Id,
    //     universoZona: colaborador.tb_universos.Zona,
    //     universoAndar: colaborador.tb_universos.Andar,
    //   }
    // })
    return colaboradores
  }
}
