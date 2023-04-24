import { IColaboradorRepository } from '@modules/colaboradores/repositories/IColaboradoRepository'
import { LojaRepository } from '@modules/lojas/infra/prisma/lojaRepository'
import { AppErrors } from '@shared/errors/AppErros'

export class AuthUsecase {
  constructor(
    private colaboradorRepository: IColaboradorRepository,
    private lojasRepository: LojaRepository,
  ) {}

  async execute(email: string, senha: string, loja: string) {
    const lojaSigla = await this.lojasRepository.buscarPorSiglaOuNome(loja)

    if (!lojaSigla) {
      throw new AppErrors('Loja não encontrada', 404)
    }

    const admin = await this.colaboradorRepository.buscarPorEmail(
      email,
      lojaSigla?.Loja_Sigla,
    )
    if (!admin) {
      throw new AppErrors('Email ou senha invalidos', 401)
    }

    if (admin.Senha !== senha) {
      throw new AppErrors('Email ou senha invalidos', 401)
    }

    if (admin.Administrador !== 'Sim') {
      throw new AppErrors('Não', 401)
    }

    return admin
  }
}
