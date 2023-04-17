import { tb_Universos } from '@prisma/client'
import { CriarUniversoDTO } from '../dto'

export interface IUniversoRepository {
  criar(data: CriarUniversoDTO): Promise<tb_Universos>
  buscarUniversosPorLoja(sigla: string): Promise<tb_Universos[]>
  buscarUniversoPorNomeELoja(
    nome: string,
    lojaSigla: string,
  ): Promise<tb_Universos | null>
  editar(data: tb_Universos): Promise<tb_Universos>
  buscarPorId(id: number): Promise<tb_Universos | null>
  deletar(id: number): Promise<void>
}
