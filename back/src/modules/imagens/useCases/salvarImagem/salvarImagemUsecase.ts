import { IImagensRepository } from '@modules/imagens/repositories/IImagensRepository'
import { ILojaInterface } from '@modules/lojas/repositories/IlojaRepository'
import { AppErrors } from '@shared/errors/AppErros'
import { File } from 'fastify-multer/lib/interfaces'

import { readFileSync, unlinkSync } from 'node:fs'
import path from 'node:path'

export class SalvarImagemUsecase {
  constructor(
    private lojaRepository: ILojaInterface,
    private imagemRepository: IImagensRepository,
  ) {}

  async execute(lojaSigla: string, titulo: string, arquivo: File) {
    const loja = await this.lojaRepository.buscarPorSiglaOuNome(lojaSigla)

    if (!loja) {
      throw new AppErrors('loja não encontrada', 404)
    }

    const imagems = await this.imagemRepository.getImages(loja.Loja_Sigla)

    const filePath = path.resolve('./', `${arquivo.path}`)
    const imagebuffer = readFileSync(path.resolve('./', filePath))

    const imagemExiste = imagems.find((img) => img.Titulo === titulo)

    if (imagemExiste) {
      await this.imagemRepository.deletar(imagemExiste.Id)
    }

    try {
      await this.imagemRepository.salvar(
        loja.Loja_Sigla,
        titulo,
        imagebuffer,
        arquivo.mimetype,
        arquivo.size,
      )

      unlinkSync(filePath)
    } catch {
      throw new AppErrors('Erro ao salvar arquivo', 400)
    }
  }
}
