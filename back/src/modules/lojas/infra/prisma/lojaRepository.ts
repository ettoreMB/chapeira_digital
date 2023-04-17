import { CriarLojaDTO } from '@modules/lojas/dtos'
import { ILojaInterface } from '@modules/lojas/repositories/IlojaRepository'
import { Prisma, tb_Lojas } from '@prisma/client'
import { prisma } from 'db/prisma'

const repository = prisma.tb_Lojas

export class LojaRepository implements ILojaInterface {
  async buscarPorCnpj(cnpj: number): Promise<tb_Lojas | null> {
    const loja = await repository.findFirst({
      where: {
        CNPJ: cnpj,
      },
    })
    return loja
  }

  async criar({
    Loja_Sigla,
    Loja,
    Loja_Endereco,
    Loja_Cidade,
    Loja_UF,
    Loja_Telefone,
    Responsavel,
    Responsavel_Email,
    Responsavel_Telefone,
    CNPJ,
  }: CriarLojaDTO) {
    const loja = await repository.create({
      data: {
        CNPJ,
        Ativo: 'Sim',
        Loja,
        Loja_Sigla,
        Loja_Endereco,
        Loja_Cidade,
        Loja_UF,
        Loja_Telefone,
        Razao_Social: 'IGUASPORT LTDA',
        Responsavel,
        Pasta_WEB: `${Loja_UF}-${Loja}`,
        Responsavel_Email,
        Responsavel_Telefone,
        Adm_Email: Responsavel_Email,
        Faturamento_Responsavel: Responsavel,
        Faturamento_Email: Responsavel_Email,
        Faturamento_Telefone: Responsavel_Telefone,
      },
    })

    return loja
  }

  async editar(data: tb_Lojas) {
    const loja = await repository.update({
      where: {
        Id: data.Id,
      },
      data: {
        Loja_Endereco: data.Loja_Endereco,
        Loja_Cidade: data.Loja_Cidade,
        Loja_Telefone: data.Loja_Telefone,
        Loja_Horario: data.Loja_Horario,
      },
    })

    return loja
  }

  async deletar(id: number) {
    await repository.update({
      where: {
        Id: id,
      },
      data: {
        Ativo: 'Nao',
      },
    })
  }

  async buscarPorSiglaOuNome(loja: string) {
    const resultado = await repository.findFirst({
      where: {
        OR: [
          {
            Loja_Sigla: loja,
          },
          {
            Pasta_WEB: loja,
          },
        ],
      },
    })
    return resultado
  }

  async buscarPorId(id: number): Promise<tb_Lojas | null> {
    const loja = await repository.findFirst({
      where: {
        Id: id,
      },
    })

    return loja
  }

  async listar(): Promise<any[]> {
    const lojas = await prisma.tb_Lojas.findMany({
      where: {
        Ativo: 'Sim',
      },
      orderBy: {
        Loja: 'asc',
      },
    })
    return lojas
  }

  async dashBoard(sigla: string) {
    const result = await prisma.$queryRaw(
      Prisma.sql`select 
      tbc.Loja_Sigla,
      tbu.Universo,
      tbu.Zona,
      tbu.Andar,
      sum( case when tbc.Tipo = 'Colaborador' OR tbc.Tipo = 'Brigadista' then 1 else 0 end) as total_colaboradores,
      sum( case when tbc.Tipo = 'Colaborador' OR tbc.Brigadista = 'Nao' then 1 else 0 end) as total_colaboradores_nao_brigadistas,
      sum( case when tbc.Tipo = 'Colaborador' OR tbc.Tipo ='Brigadista' AND tbc.Status = 'Presente' then 1 else 0 end) as colaboradores_presentes,
      sum( case when tbc.Tipo = 'Colaborador' AND tbc.Status = 'Ausente' then 1 else 0 end) as colaboradores_ausentes,
      sum( case when tbc.Brigadista = 'Sim'  then 1 else 0 end) as total_brigadistas,
      sum( case when tbc.Brigadista = 'Sim' AND tbc.Status = 'Presente' then 1 else 0 end) as brigadistas_presentes,
      sum( case when tbc.Brigadista = 'Sim' AND tbc.Status = 'Ausente' then 1 else 0 end) as brigadistas_ausentes,
      sum( case when tbc.Tipo = 'Visitante' then 1 else 0 end) as total_visitantes,
      sum( case when tbc.Tipo = 'Visitante'AND tbc.Status =  'Presente' then 1 else 0 end) as total_visitantes_presentes,
      sum( case when tbc.Tipo = 'Visitante'AND tbc.Status =  'Ausente' then 1 else 0 end) as total_visitante_ausentes,
      sum( case when tbc.Tipo = 'Terceiro' then 1 else 0 end) as total_terceiros,
      sum( case when tbc.Tipo = 'Terceiro'AND tbc.Status =  'Presente' then 1 else 0 end) as total_terceiros_presentes,
      sum( case when tbc.Tipo = 'Terceiro'AND tbc.Status =  'Ausente' then 1 else 0 end) as total_terceiros_ausentes
      from tb_Colaboradores as tbc
      left join tb_Universos as tbu
        on tbu.Id = tbc.Id_Universo
      where tbc.Loja_Sigla = ${sigla} AND tbc.Ativo = 'Sim'
      group by tbu.Zona, tbc.Loja_Sigla,tbu.Andar,tbu.Universo ;`,
    )

    return result
  }
}
