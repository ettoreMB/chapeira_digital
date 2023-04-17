import { IColaboradorRepository } from '@modules/colaboradores/repositories/IColaboradoRepository'
import { ILojaInterface } from '@modules/lojas/repositories/IlojaRepository'
import { AppErrors } from '@shared/errors/AppErros'

export class InformacoesColaboradoresUsecase {
  constructor(
    private colaboradoresRepository: IColaboradorRepository,
    private lojaRepository: ILojaInterface,
  ) {}

  async execute(nome: string) {
    const loja = await this.lojaRepository.buscarPorSiglaOuNome(nome)

    if (!loja) {
      throw new AppErrors('Loja nao encontrada no sistema', 404)
    }

    try {
      const resultado =
        await this.colaboradoresRepository.informacaoColaboradores(
          loja.Loja_Sigla,
        )

      return resultado
    } catch (error) {
      throw new AppErrors('Erro ao buscas dados', 500)
    }
  }
}
