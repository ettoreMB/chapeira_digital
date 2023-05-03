import { IImagensRepository } from '@modules/imagens/repositories/IImagensRepository'
import { tb_Lojas_Imagens } from '@prisma/client'
import { prisma } from 'db/prisma'
import { File } from 'fastify-multer/lib/interfaces'

export class ImagensRepositoryInMemory implements IImagensRepository {
  private imagens: tb_Lojas_Imagens[] = []
  salvar(loja: string, titulo: string, arquivo: File): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async getImages(loja: string): Promise<any[]> {
    const images = await prisma.tb_Lojas_Imagens.findMany({
      where: {
        Loja_Sigla: loja,
      },
    })
    return images
  }
}
