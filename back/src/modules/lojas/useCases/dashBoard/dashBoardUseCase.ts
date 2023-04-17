import { ILojaInterface } from '@modules/lojas/repositories/IlojaRepository'
import { AppErrors } from '@shared/errors/AppErros'

export class DashBoardUsecase {
  constructor(private lojasRepository: ILojaInterface) {}

  async execute(loja: string) {
    const lojaExiste = await this.lojasRepository.buscarPorSiglaOuNome(loja)

    if (!lojaExiste) {
      throw new AppErrors('Loja não encontrada no sistema', 404)
    }

    const dados = await this.lojasRepository.dashBoard(lojaExiste.Loja_Sigla)

    return { dados }
  }
}
