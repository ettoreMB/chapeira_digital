import { IImagensRepository } from '@modules/imagens/repositories/IImagensRepository'

export class BuscarImagensUseCase {
  constructor(private imagensRepository: IImagensRepository) {}

  async execute(loja: string): Promise<any[]> {
    const images = await this.imagensRepository.getImages(loja)

    const imagesResult = images.map((image) => {
      return {
        nome: image.Titulo,
        imageType: image.Tipo,
        src: Buffer.from(image.Imagem, 'binary').toString('base64'),
        descricao: image.Descricao,
      }
    })

    return imagesResult
  }
}
