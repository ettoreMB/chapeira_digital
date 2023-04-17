import { IImagensRepository } from '@modules/imagens/repositories/IImagensRepository'
import { prisma } from 'db/prisma'

export class ImagensRepository implements IImagensRepository {
  async getImages(loja: string): Promise<any[]> {
    const images = await prisma.tb_Lojas_Imagens.findMany({
      where: {
        Loja_Sigla: loja,
      },
    })
    return images
  }
}
