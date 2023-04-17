import { CriarLojaDTO } from '@modules/lojas/dtos'
import { ILojaInterface } from '@modules/lojas/repositories/IlojaRepository'
import { tb_Lojas } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime'

export class LojasRepositoryInMemory implements ILojaInterface {
  async buscarPorCnpj(cnpj: number) {
    const loja = this.items.find((item) => item.CNPJ === cnpj)
    if (!loja) {
      return null
    }

    return loja
  }

  async dashBoard(sigla: string): Promise<any> {
    throw new Error('Method not implemented.')
  }

  public items: tb_Lojas[] = []

  async criar(data: CriarLojaDTO): Promise<tb_Lojas> {
    const loja = {
      Id: Math.floor(Math.random()),
      Ativo: 'Sim',
      Loja_Sigla: data.Loja_Sigla,
      Razao_Social: 'razao-social-teste',
      Loja: data.Loja,
      Loja_Endereco: data.Loja_Endereco,
      Loja_Telefone: data.Loja_Telefone,
      Loja_Horario: '123',
      Loja_Grupo: '',
      EPLANNER: false,
      E_Planner: '',
      Responsavel: data.Responsavel,
      Responsavel_Email: data.Responsavel_Email,
      Responsavel_Telefone: data.Responsavel_Telefone,
      Faturamento_Responsavel: data.Responsavel,
      Faturamento_Email: data.Responsavel_Email,
      Faturamento_Telefone: data.Responsavel_Telefone,
      Adm_Email: data.Responsavel_Email,
      Adm_Senha: '123',
      Pasta_WEB: `${data.Loja_UF}-${data.Loja}`,
      URL: `http://chapeira.com.br/${data.Loja_UF}-${data.Loja}`,
      Faturamento_Inicio: new Date(),
      Faturar: true,
      CNPJ: data.CNPJ,
      Inscricao_Estadual: '',
      Tablets: new Decimal(2),
      Insert_Date: new Date(),
      Insert_User: '',
      Update_Date: new Date(),
      Update_User: '',
      Loja_Cidade: data.Loja_Cidade,
      Loja_Pais_Sigla: 'BR',
      Loja_UF: 'sp',
    }

    this.items.push(loja)

    return loja
  }

  async editar(data: tb_Lojas) {
    const lojaIndex = this.items.findIndex((loja) => loja.Id === data.Id)
    if (lojaIndex >= 0) {
      this.items[lojaIndex] = data
    }

    return data
  }

  async deletar(id: number) {
    throw new Error('Method not implemented.')
  }

  buscarPorNome(loja: string): Promise<tb_Lojas | null> {
    throw new Error('Method not implemented.')
  }

  async buscarPorSiglaOuNome(lojaSigla: string) {
    const loja = this.items.find(
      (item) => item.Loja_Sigla === lojaSigla || item.Pasta_WEB === lojaSigla,
    )

    if (!loja) {
      return null
    }

    return loja
  }

  async buscarPorId(id: number) {
    const loja = this.items.find((item) => item.Id === id)

    if (!loja) {
      return null
    }

    return loja
  }

  listar(): Promise<tb_Lojas[]> {
    throw new Error('Method not implemented.')
  }
}
