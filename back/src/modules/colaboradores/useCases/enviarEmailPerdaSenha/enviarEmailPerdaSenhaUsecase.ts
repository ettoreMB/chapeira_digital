import { IColaboradorRepository } from '@modules/colaboradores/repositories/IColaboradoRepository'
import { ILojaInterface } from '@modules/lojas/repositories/IlojaRepository'
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider'
import { AppErrors } from '@shared/errors/AppErros'
import { env } from 'env'
import path from 'node:path'

export class EnviarEmailPerdaSenhaUsecase {
  constructor(
    private colaboradorRepository: IColaboradorRepository,
    private lojaRepository: ILojaInterface,
    private mailProvider: IMailProvider,
  ) {}

  async execute(
    email: string,
    lojaSigla: string,
    token: string,
  ): Promise<void> {
    const colaborador = await this.colaboradorRepository.buscarPorEmail(
      email,
      lojaSigla,
    )
    const loja = await this.lojaRepository.buscarPorSiglaOuNome(lojaSigla)

    if (!colaborador) {
      throw new AppErrors('Colaborador não encontrado', 404)
    }

    if (colaborador.Administrador === 'Nao') {
      throw new AppErrors('Não autorizado', 401)
    }
    if (
      lojaSigla.toUpperCase() !== loja?.Pasta_WEB?.toUpperCase() &&
      lojaSigla.toUpperCase() !== loja?.Loja_Sigla.toUpperCase()
    ) {
      throw new AppErrors('Loja não encontrada', 404)
    }

    const templatePath = path.resolve('views', 'emails', 'recuperarSenha.hbs')
    const variaveis = {
      nome: colaborador.Nome,
      token,
      lojaSigla,
      link: `${env.FRONT_URL}/${loja.Pasta_WEB}/recuperarSenha/${token}`,
    }
    await this.mailProvider.enviarEmail(
      email,
      'Recuperação de senha chapeira digital',
      variaveis,
      templatePath,
    )
  }
}
