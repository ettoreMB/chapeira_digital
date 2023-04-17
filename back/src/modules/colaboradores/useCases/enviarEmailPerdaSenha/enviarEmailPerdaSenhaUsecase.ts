import { IColaboradorRepository } from '@modules/colaboradores/repositories/IColaboradoRepository'
import { ILojaInterface } from '@modules/lojas/repositories/IlojaRepository'
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider'
import { AppErrors } from '@shared/errors/AppErros'
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
    const colaborador = await this.colaboradorRepository.buscarPorEmail(email)
    const loja = await this.lojaRepository.buscarPorSiglaOuNome(lojaSigla)
    if (!colaborador) {
      throw new AppErrors('Colaborador não encontrado', 404)
    }

    if (lojaSigla !== loja?.Pasta_WEB) {
      throw new AppErrors('Loja não encontrada', 404)
    }

    const templatePath = path.resolve(
      'src',
      'views',
      'emails',
      'recuperarSenha.hbs',
    )
    const variaveis = {
      nome: colaborador.Nome,
      token,
      link: `http://localhost:3000/recuperarSenha/${token}`,
    }
    await this.mailProvider.enviarEmail(
      email,
      'Recuperação de senha',
      variaveis,
      templatePath,
    )
  }
}
