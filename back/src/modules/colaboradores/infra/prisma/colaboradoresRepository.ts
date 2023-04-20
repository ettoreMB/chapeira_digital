import {
  ColaboradorCheckInInputDto,
  CriarColaboradorInputDTO,
  DesativarColaboradorDto,
} from '@modules/colaboradores/dto'
import {
  IColaboradorRepository,
  IListarColaboradoresParams,
} from '@modules/colaboradores/repositories/IColaboradoRepository'
import { tb_Colaboradores } from '@prisma/client'
import { randomUUID } from 'crypto'
import { prisma } from 'db/prisma'

export class ColaboradoresRepository implements IColaboradorRepository {
  db = prisma.tb_Colaboradores
  async editar({
    Id,
    Nome,
    Administrador,
    Senha,
    Id_Universo,
    Brigadista,
    Formacao_Data,
    Admissao_Data,
    Email,
    Telefone,
    Funcao,
    Endereco,
    Observacao,
    Empresa,
  }: tb_Colaboradores): Promise<tb_Colaboradores> {
    const colborador = await this.db.update({
      where: { Id },
      data: {
        Nome,
        Administrador,
        Id_Universo,
        Brigadista,
        Formacao_Data,
        Admissao_Data,
        Senha,
        Email,
        Telefone,
        Funcao,
        Endereco,
        Observacao,
        Empresa,
      },
    })

    return colborador
  }

  async listarColaboradoresPorTipoOuUniverso({
    sigla,
    tipo,
    universoId,
  }: IListarColaboradoresParams) {
    if (tipo) {
      const colaboradores = await this.db.findMany({
        where: {
          Loja_Sigla: sigla,
          Ativo: 'Sim',
          Tipo: tipo,
        },
        include: {
          tb_universos: {
            select: {
              Universo: true,
            },
          },
        },
      })

      return colaboradores
    }
    if (universoId) {
      const colaboradores = await this.db.findMany({
        where: {
          Loja_Sigla: sigla,
          Ativo: 'Sim',
          Id_Universo: universoId,
        },
        include: {
          tb_universos: {
            select: {
              Universo: true,
            },
          },
        },
      })

      return colaboradores
    }
    const colaboradores = await this.db.findMany({
      where: {
        Loja_Sigla: sigla,
        Ativo: 'Sim',
        OR: [{ Tipo: 'Colaborador' }, { Tipo: 'Brigadista' }],
      },
      include: {
        tb_universos: {
          select: {
            Universo: true,
          },
        },
      },
    })

    return colaboradores
  }

  async desativarColaborador(
    id: number,
    {
      Acao,
      Administrador,
      Ativo,
      CheckIn,
      CheckIn_Status,
      Cor,
      Id_Universo,
      Senha,
      Status,
    }: DesativarColaboradorDto,
  ): Promise<void> {
    await this.db.update({
      where: {
        Id: id,
      },
      data: {
        Acao,
        Administrador,
        Ativo,
        CheckIn,
        CheckIn_Status,
        Cor,
        Id_Universo,
        Senha,
        Status,
      },
    })
  }

  async buscarPorId(id: number) {
    const colaborador = await this.db.findFirst({
      where: {
        Id: id,
      },
      include: {
        tb_universos: {
          select: {
            Universo: true,
            Id: true,
          },
        },
      },
    })
    return colaborador
  }

  async buscarPorEmail(email: string): Promise<tb_Colaboradores | null> {
    const colaborador = await this.db.findFirst({
      where: {
        Email: email,
      },
    })
    return colaborador
  }

  async criar({
    Loja_Sigla,
    Nome,
    Email,
    Tipo,
    Endereco,
    Telefone,
    Id_Universo,
    Senha,
    Funcao,
    Empresa,
    Administrador,
    Brigadista,
    Formacao_Data,
    Admissao_Data,
    Observacao,
  }: CriarColaboradorInputDTO) {
    const colaborador = await this.db.create({
      data: {
        Loja_Sigla,
        Ativo: 'Sim',
        Id_Key: `${Loja_Sigla}-${randomUUID()}`,
        Id_Universo,
        Tipo,
        Nome,
        Funcao: Funcao && null,
        Email,
        Administrador,
        Endereco,
        Empresa,
        Telefone,
        Senha: Senha || randomUUID(),
        Brigadista,
        Formacao_Data: Formacao_Data && null,
        Admissao_Data,
        Insert_Date: String(new Date()),
        Observacao,
      },
    })

    return colaborador
  }

  async checkIn(
    id: number,
    {
      checkIn,
      status,
      checkInStatus,
      checkInDate,
      acao,
      cor,
      ip,
      browser,
    }: ColaboradorCheckInInputDto,
  ): Promise<void> {
    await this.db.update({
      where: {
        Id: id,
      },
      data: {
        CheckIn: checkIn,
        CheckIn_Browser: browser,
        CheckIn_Date: checkInDate,
        CheckIn_IP: ip,
        CheckIn_Status: checkInStatus,
        Status: status,
        Acao: acao,
        Cor: cor,
      },
    })
  }

  updateAdmin(id: string, Administrador: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async informacaoColaboradores(loja: string): Promise<any> {
    const colaboradores = await prisma.tb_Colaboradores.count({
      where: {
        Loja_Sigla: loja,
        Ativo: 'Sim',
        Tipo: 'Colaborador',
        Status: 'Presente',
      },
    })
    const brigadistas = await prisma.tb_Colaboradores.count({
      where: {
        Loja_Sigla: loja,
        Ativo: 'Sim',
        Brigadista: 'Sim',
        Status: 'Presente',
      },
    })

    const terceiros = await prisma.tb_Colaboradores.count({
      where: {
        Loja_Sigla: loja,
        Ativo: 'Sim',
        Tipo: 'Terceiro',
        Status: 'Presente',
      },
    })
    const visitantes = await prisma.tb_Colaboradores.count({
      where: {
        Loja_Sigla: loja,
        Ativo: 'Sim',
        Tipo: 'Visitante',
        Status: 'Presente',
      },
    })
    const offline = await prisma.tb_Colaboradores.count({
      where: {
        Loja_Sigla: loja,
        Ativo: 'Sim',
        Status: 'Ausente',
      },
    })

    return { colaboradores, brigadistas, terceiros, visitantes, offline }
  }
}
