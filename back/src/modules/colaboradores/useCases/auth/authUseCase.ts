import { IColaboradorRepository } from '@modules/colaboradores/repositories/IColaboradoRepository'
import { AppErrors } from '@shared/errors/AppErros'

export class AuthUsecase {
  constructor(private colaboradorRepository: IColaboradorRepository) {}

  async execute(email: string, senha: string) {
    const admin = await this.colaboradorRepository.buscarPorEmail(email)

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
