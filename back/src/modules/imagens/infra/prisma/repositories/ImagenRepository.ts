import { IImagensRepository } from '@modules/imagens/repositories/IImagensRepository'
import { tb_Lojas_Imagens } from '@prisma/client'

import { prisma } from 'db/prisma'

export class ImagensRepository implements IImagensRepository {
  async deletar(id: number): Promise<void> {
    await prisma.tb_Lojas_Imagens.delete({
      where: {
        Id: id,
      },
    })
  }

  async salvar(
    loja: string,
    titulo: string,
    arquivo: Buffer | undefined,
    tipoArquivo: string,
    tamanho: number | undefined,
  ): Promise<void> {
    const id = await prisma.tb_Lojas_Imagens.count()

    await prisma.tb_Lojas_Imagens.create({
      data: {
        Id: id + 1,
        Imagem: arquivo,
        Insert_Date: new Date(),
        Loja_Sigla: loja,
        Tamanho: tamanho,
        Tipo: tipoArquivo,
        Titulo: titulo,
      },
    })
  }

  async editar(imagem: tb_Lojas_Imagens) {
    return await prisma.tb_Lojas_Imagens.update({
      where: {
        Id: imagem.Id,
      },
      data: {
        Tamanho: 123,
      },
    })
  }

  async getImages(loja: string): Promise<tb_Lojas_Imagens[]> {
    const images = await prisma.tb_Lojas_Imagens.findMany({
      where: {
        Loja_Sigla: loja,
      },
    })
    return images
  }
}
