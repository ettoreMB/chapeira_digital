import { CriarCidadeInput } from '@modules/cidades/dto'
import { ICidadesRepository } from '@modules/cidades/repositories/ICidadesRepository'
import { tb_Cidades } from '@prisma/client'

export class CidadeRepositoryInMemory implements ICidadesRepository {
  items: tb_Cidades[] = []
  async criar(data: CriarCidadeInput): Promise<void> {
    const cidade = {
      Id: Math.random(),
      Pais_Sigla: 'BR',
      Estado_Sigla: data.estadoSigla,
      Cidade: data.cidade,
      Insert_Date: new Date(),
      Insert_User: '',
      Update_Date: new Date(),
      Update_User: '',
    }

    this.items.push(cidade)
  }

  async buscarPorCidade(cidade: string) {
    const resultado = this.items.find((item) => item.Cidade === cidade)

    if (!resultado) {
      return null
    }

    return resultado
  }
}
