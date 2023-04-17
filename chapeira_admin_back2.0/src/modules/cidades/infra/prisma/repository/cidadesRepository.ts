import { CriarCidadeInput } from '@modules/cidades/dto'
import { ICidadesRepository } from '@modules/cidades/repositories/ICidadesRepository'
import { prisma } from 'db/prisma'

const db = prisma.tb_Cidades
export class CidadeRepository implements ICidadesRepository {
  async criar(data: CriarCidadeInput): Promise<void> {
    await db.create({
      data: {
        Cidade: data.cidade,
        Pais_Sigla: 'BR',
        Estado_Sigla: data.estadoSigla,
        Insert_Date: new Date(),
      },
    })
  }

  async buscarPorCidade(cidade: string) {
    const resposta = await db.findFirst({
      where: {
        Cidade: cidade,
      },
    })

    return resposta
  }
}
