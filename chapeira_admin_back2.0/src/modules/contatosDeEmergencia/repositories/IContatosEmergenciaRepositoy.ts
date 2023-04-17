import { Prisma, tb_Contatos_Emergencia } from '@prisma/client'

export interface IContatosEmergenciaRepository {
  getAll(sigla: string): Promise<tb_Contatos_Emergencia[]>
  criar(
    data: Prisma.tb_Contatos_EmergenciaUncheckedCreateInput,
  ): Promise<tb_Contatos_Emergencia>
  buscarPorNomeELoja(
    lojaSigla: string,
    nome: string,
  ): Promise<tb_Contatos_Emergencia | null>
  buscarPorId(id: number): Promise<tb_Contatos_Emergencia | null>
  editar(data: tb_Contatos_Emergencia): Promise<tb_Contatos_Emergencia>
  deletar(id: number): Promise<void>
}
