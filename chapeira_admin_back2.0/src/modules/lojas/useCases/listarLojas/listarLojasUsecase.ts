import { ReturnLojaDTO } from '@modules/lojas/dtos'
import { ILojaInterface } from '@modules/lojas/repositories/IlojaRepository'
import { tb_Lojas } from '@prisma/client'
import { AppErrors } from '@shared/errors/AppErros'

export class ListarLojasUsecase {
  constructor(private lojasRepository: ILojaInterface) {}

  async execute(): Promise<ReturnLojaDTO[]> {
    try {
      const lojas = await this.lojasRepository.listar()
      const lojasDto = lojas.map((loja: tb_Lojas) => {
        const response: ReturnLojaDTO = {
          ativo: loja.Ativo!,
          loja: loja.Loja!,
          sigla: loja.Loja_Sigla!,
          pastaWEB: loja.Pasta_WEB!,
          cidade: loja.Loja_Cidade!,
          endereco: loja.Loja_Endereco!,
          UF: loja.Loja_UF!,
          responsavel: loja.Responsavel!,
          responsavelEmail: loja.Responsavel_Email!,
          responsavelTelefone: loja.Responsavel_Telefone,
        }

        return response
      })
      return lojasDto
    } catch (error) {
      console.error(error)
      throw new AppErrors('Erro ao listar as lojas', 500)
    }
  }
}
