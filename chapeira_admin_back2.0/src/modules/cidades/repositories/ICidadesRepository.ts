import { CriarCidadeInput } from '@modules/cidades/dto'
import { tb_Cidades } from '@prisma/client'

export interface ICidadesRepository {
  criar(data: CriarCidadeInput): Promise<void>
  buscarPorCidade(cidade: string): Promise<tb_Cidades | null>
}
