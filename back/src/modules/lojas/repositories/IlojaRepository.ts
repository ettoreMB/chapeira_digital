import { tb_Lojas } from '@prisma/client'
import { CriarLojaDTO } from '../dtos'

export interface ILojaInterface {
  criar(data: CriarLojaDTO): Promise<tb_Lojas>
  editar(data: tb_Lojas): Promise<tb_Lojas | null>
  deletar(id: number): Promise<void>
  buscarPorSiglaOuNome(loja: string): Promise<tb_Lojas | null>
  buscarPorCnpj(cnpj: number): Promise<tb_Lojas | null>
  buscarPorId(id: number): Promise<tb_Lojas | null>
  listar(): Promise<tb_Lojas[]>
  dashBoard(sigla: string): Promise<any>
}
