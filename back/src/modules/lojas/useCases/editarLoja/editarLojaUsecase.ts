import { EditarLojaDTO } from '@modules/lojas/dtos'
import { LojaNaoEncontradaErro } from '@modules/lojas/errors/lojaNaoEcontradaErro'
import { ILojaInterface } from '@modules/lojas/repositories/IlojaRepository'
import { tb_Lojas } from '@prisma/client'

export class EditarLojaUsecase {
  constructor(private lojaRepository: ILojaInterface) {}

  async execute(
    id: number,
    { Loja_Endereco, Loja_Telefone, Loja_Horario, Loja_Cidade }: EditarLojaDTO,
  ): Promise<tb_Lojas> {
    const loja = await this.lojaRepository.buscarPorId(id)

    if (!loja) {
      throw new LojaNaoEncontradaErro()
    }

    loja.Loja_Endereco = Loja_Endereco
    loja.Loja_Telefone = Loja_Telefone
    loja.Loja_Horario = Loja_Horario
    loja.Loja_Cidade = Loja_Cidade

    await this.lojaRepository.editar(loja)
    return loja
  }
}
