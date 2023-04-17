import { ILojaInterface } from '@modules/lojas/repositories/IlojaRepository'
import { IUniversoRepository } from '@modules/universos/repositories/IUniversoRepository'
import { AppErrors } from '@shared/errors/AppErros'

export class ListarUniversosPorLojaUsecase {
  constructor(
    private universosRepository: IUniversoRepository,
    private lojasRepository: ILojaInterface,
  ) {}

  async execute(nome: string) {
    const loja = await this.lojasRepository.buscarPorSiglaOuNome(nome)

    if (!loja) {
      throw new AppErrors(`A loja ${loja} não está registrada no sistema`)
    }

    const universos = await this.universosRepository.buscarUniversosPorLoja(
      loja.Loja_Sigla,
    )

    return universos
  }
}
