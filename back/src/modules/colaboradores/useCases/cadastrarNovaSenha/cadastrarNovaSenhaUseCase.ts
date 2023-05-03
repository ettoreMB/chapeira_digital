import { IColaboradorRepository } from '@modules/colaboradores/repositories/IColaboradoRepository'
import { ILojaInterface } from '@modules/lojas/repositories/IlojaRepository'
import { AppErrors } from '@shared/errors/AppErros'
import { createDecoder } from 'fast-jwt'

export class CadastrarNovaSenhaUseCase {
  constructor(
    private colaboradoresRepository: IColaboradorRepository,
    private lojaRepository: ILojaInterface,
  ) {}

  async execute(token: string, senha: string, lojaSigla: string) {
    const decoder = createDecoder()
    const decodedToken = decoder(token)

    const colaborador = await this.colaboradoresRepository.buscarPorEmail(
      decodedToken.sub,
      lojaSigla,
    )
    const loja = await this.lojaRepository.buscarPorSiglaOuNome(lojaSigla)

    if (colaborador?.Administrador === 'Nao') {
      throw new AppErrors('não autorizado', 401)
    }
    if (colaborador?.Loja_Sigla !== lojaSigla) {
      throw new AppErrors('sigla divergente', 401)
    }

    if (loja?.Pasta_WEB?.toUpperCase() !== lojaSigla.toUpperCase()) {
      throw new AppErrors('loja divergente', 402)
    }

    colaborador.Senha = senha

    await this.colaboradoresRepository.editar(colaborador)

    return colaborador
  }
}
