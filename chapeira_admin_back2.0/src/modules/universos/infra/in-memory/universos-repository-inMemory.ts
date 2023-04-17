import { CriarUniversoDTO } from '@modules/universos/dto'
import { IUniversoRepository } from '@modules/universos/repositories/IUniversoRepository'
import { tb_Universos } from '@prisma/client'
import { randomUUID } from 'crypto'

export class UniversosRepositoryInMemory implements IUniversoRepository {
  items: tb_Universos[] = []
  async criar(data: CriarUniversoDTO): Promise<tb_Universos> {
    const universo: tb_Universos = {
      Id: Math.floor(Math.random() * 100),
      Id_Key: randomUUID(),
      Loja_Sigla: data.Loja_Sigla,
      Zona: data.Zona,
      Andar: data.Andar,
      Universo: data.Universo,
      Insert_Date: new Date(),
      Insert_User: '',
      Update_Date: new Date(),
      Update_User: '',
    }

    this.items.push(universo)

    return universo
  }

  async buscarUniversosPorLoja(sigla: string): Promise<tb_Universos[]> {
    const universos = this.items.filter(
      (universo) => universo.Loja_Sigla === sigla,
    )

    return universos
  }

  async buscarUniversoPorNomeELoja(nome: string, lojaSigla: string) {
    const universo = this.items.find(
      (universo) =>
        universo.Universo === nome && universo.Loja_Sigla === lojaSigla,
    )

    if (!universo) {
      return null
    }

    return universo
  }

  async editar(data: tb_Universos) {
    const universoIndex = this.items.findIndex(
      (universo) => universo.Id === data.Id,
    )

    if (universoIndex >= 0) {
      this.items[universoIndex] = data
    }

    return data
  }

  async buscarPorId(id: number): Promise<tb_Universos | null> {
    const universo = await this.items.find((universo) => universo.Id === id)

    if (!universo) {
      return null
    }

    return universo
  }

  async deletar(id: number): Promise<void> {
    this.items = this.items.filter((universo) => universo.Id !== id)
  }
}
