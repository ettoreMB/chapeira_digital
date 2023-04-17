import { CriarUniversoDTO } from '@modules/universos/dto'
import { IUniversoRepository } from '@modules/universos/repositories/IUniversoRepository'
import { tb_Universos } from '@prisma/client'

import { prisma } from 'db/prisma'
import { randomUUID } from 'node:crypto'

const db = prisma.tb_Universos

export class UniversoRepository implements IUniversoRepository {
  async deletar(id: number): Promise<void> {
    await db.delete({
      where: {
        Id: id,
      },
    })
  }

  async editar(data: tb_Universos) {
    const universo = await db.update({
      where: {
        Id: data.Id,
      },
      data: {
        Universo: data.Universo,
        Zona: data.Zona,
        Andar: data.Andar,
      },
    })

    return universo
  }

  async buscarPorId(id: number): Promise<tb_Universos | null> {
    const universo = await db.findFirst({
      where: {
        Id: id,
      },
    })
    return universo
  }

  async criar({ Loja_Sigla, Universo, Andar, Zona }: CriarUniversoDTO) {
    const universo = await prisma.tb_Universos.create({
      data: {
        Id_Key: randomUUID(),
        Loja_Sigla,
        Universo,
        Andar,
        Zona,
        Insert_Date: new Date(),
        Update_Date: null,
        Update_User: null,
        Insert_User: null,
      },
    })

    return universo
  }

  async buscarUniversosPorLoja(sigla: string): Promise<tb_Universos[]> {
    const universos = await db.findMany({
      where: {
        Loja_Sigla: sigla,
      },
    })

    return universos
  }

  async buscarUniversoPorNomeELoja(
    nome: string,
    lojaSigla: string,
  ): Promise<tb_Universos | null> {
    const universo = await db.findFirst({
      where: {
        Loja_Sigla: lojaSigla,
        AND: {
          Universo: nome,
        },
      },
    })

    return universo
  }
}
