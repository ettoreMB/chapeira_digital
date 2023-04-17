import { IContatosEmergenciaRepository } from '@modules/contatosDeEmergencia/repositories/IContatosEmergenciaRepositoy'
import { Prisma, tb_Contatos_Emergencia } from '@prisma/client'

export class InMemoryContatosDeEmergenciaRepository
  implements IContatosEmergenciaRepository
{
  private items: tb_Contatos_Emergencia[] = []

  async editar(data: tb_Contatos_Emergencia): Promise<tb_Contatos_Emergencia> {
    const contatoIndex = this.items.findIndex(
      (contato) => contato.Id === data.Id,
    )

    if (contatoIndex >= 0) {
      this.items[contatoIndex] = data
    }

    return data
  }

  async buscarPorId(id: number) {
    const contato = this.items.find((contato) => contato.Id === id)

    if (!contato) {
      return null
    }

    return contato
  }

  async getAll(sigla: string) {
    return this.items.filter((contato) => contato.Loja_Sigla === sigla)
  }

  async criar(data: Prisma.tb_Contatos_EmergenciaUncheckedCreateInput) {
    const contato: tb_Contatos_Emergencia = {
      Id: Math.floor(Math.random() * 10),
      Contato: data.Contato ? data.Contato : null,
      Descricao: data.Descricao ? data.Descricao : null,
      Endereco: data.Endereco ? data.Endereco : null,
      Insert_Date: data.Insert_Date ? new Date(data.Insert_Date) : null,
      Loja_Sigla: data.Loja_Sigla ? data.Loja_Sigla : null,
      Telefone: data.Telefone ? data.Telefone : null,
      Insert_User: data.Insert_User ? data.Insert_User : null,
      Update_Date: data.Update_Date ? new Date(data.Update_Date) : null,
      Update_User: data.Update_User ? data.Update_User : null,
    }

    this.items.push(contato)

    return contato
  }

  async buscarPorNomeELoja(lojaSigla: string, nome: string) {
    const contato = this.items.find(
      (contato) => contato.Contato === nome && contato.Loja_Sigla === lojaSigla,
    )
    if (!contato) {
      return null
    }

    return contato
  }

  async deletar(id: number) {
    this.items = this.items.filter((contato) => contato.Id !== id)
  }
}
