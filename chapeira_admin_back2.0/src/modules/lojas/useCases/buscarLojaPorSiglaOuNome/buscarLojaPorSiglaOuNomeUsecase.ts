import { ReturnLojaDTO } from '@modules/lojas/dtos'
import { ILojaInterface } from '@modules/lojas/repositories/IlojaRepository'
import { AppErrors } from '@shared/errors/AppErros'

export class BuscarLojaPorSiglaOuNomeUsecase {
  constructor(private lojasRepository: ILojaInterface) {}
  async execute(sigla: string): Promise<ReturnLojaDTO | undefined> {
    const loja = await this.lojasRepository.buscarPorSiglaOuNome(sigla)

    if (!loja) {
      throw new AppErrors('Loja não encontrada no sistema', 404)
    }
    const resposta: ReturnLojaDTO = {
      id: loja.Id,
      ativo: loja?.Ativo!,
      loja: loja?.Loja!,
      sigla: loja?.Loja_Sigla!,
      pastaWEB: loja?.Pasta_WEB!,
      URL: loja?.URL!,
      cidade: loja?.Loja_Cidade!,
      endereco: loja?.Loja_Endereco!,
      telefone: loja?.Loja_Telefone!,
      UF: loja?.Loja_UF!,
      horario: loja.Loja_Horario!,
      responsavel: loja?.Responsavel!,
      responsavelEmail: loja?.Responsavel_Email!,
      responsavelTelefone: loja?.Responsavel_Telefone!,
    }

    return resposta
  }
}
