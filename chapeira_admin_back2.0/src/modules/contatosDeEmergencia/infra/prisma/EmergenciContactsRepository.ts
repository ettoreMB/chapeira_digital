import { IContatosEmergenciaRepository } from '../../repositories/IContatosEmergenciaRepositoy'
import { prisma } from '../../../../db/prisma'
import { Prisma, tb_Contatos_Emergencia } from '@prisma/client'

export class ContatosEmergenciaRepository
  implements IContatosEmergenciaRepository
{
  async buscarPorNomeELoja(lojaSigla: string, nome: string) {
    const contato = await prisma.tb_Contatos_Emergencia.findFirst({
      where: {
        Loja_Sigla: lojaSigla,
        AND: {
          Contato: nome,
        },
      },
    })

    return contato
  }

  async criar({
    Contato,
    Descricao,
    Telefone,
    Loja_Sigla,
  }: Prisma.tb_Contatos_EmergenciaUncheckedCreateInput): Promise<tb_Contatos_Emergencia> {
    const contato = await prisma.tb_Contatos_Emergencia.create({
      data: {
        Contato,
        Descricao,
        Loja_Sigla,
        Telefone,
        Insert_Date: new Date(),
      },
    })
    return contato
  }

  async buscarPorId(id: number) {
    const contato = await prisma.tb_Contatos_Emergencia.findUnique({
      where: {
        Id: id,
      },
    })

    return contato
  }

  async editar(contato: tb_Contatos_Emergencia) {
    const result = await prisma.tb_Contatos_Emergencia.update({
      where: {
        Id: contato.Id,
      },
      data: {
        Contato: contato.Contato,
        Endereco: contato.Endereco,
        Telefone: contato.Telefone,
        Update_Date: new Date(),
        Descricao: contato.Descricao,
      },
    })

    return result
  }

  async getAll(sigla: string): Promise<tb_Contatos_Emergencia[]> {
    const contacts = await prisma.tb_Contatos_Emergencia.findMany({
      where: { Loja_Sigla: sigla },
    })

    return contacts
  }

  async deletar(id: number): Promise<void> {
    await prisma.tb_Contatos_Emergencia.delete({
      where: {
        Id: id,
      },
    })
  }
}
