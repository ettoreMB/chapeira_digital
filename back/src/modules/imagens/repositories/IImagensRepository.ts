import { tb_Lojas_Imagens } from '@prisma/client'

export interface IImagensRepository {
  getImages(loja: string): Promise<tb_Lojas_Imagens[]>
  salvar(
    loja: string,
    titulo: string,
    arquivo: Buffer | undefined,
    tipoArquivo: string,
    tamanho: number | undefined,
  ): Promise<void>
  editar(imagem: tb_Lojas_Imagens): Promise<tb_Lojas_Imagens>
  deletar(id: number): Promise<void>
}
