import {
  CriarColaboradorInputDTO,
  ColaboradorCheckInInputDto,
  DesativarColaboradorDto,
} from '@modules/colaboradores/dto'

import {
  IColaboradorRepository,
  IListarColaboradoresParams,
} from '@modules/colaboradores/repositories/IColaboradoRepository'
import { tb_Colaboradores } from '@prisma/client'
import { randomUUID } from 'crypto'

export class ColaboradoresRepositoryInMemory implements IColaboradorRepository {
  items: tb_Colaboradores[] = []
  async buscarPorId(id: number): Promise<
    | (tb_Colaboradores & {
        tb_universos: { Id: number; Universo: string } | null
      })
    | null
  > {
    const colaborador = this.items.find((colaborador) => colaborador.Id === id)

    if (!colaborador) {
      return null
    }
    const newColaborador = {
      ...colaborador,
      tb_universos: {
        Id: 0,
        Universo: '',
      },
    }
    return newColaborador
  }

  async buscarPorEmail(email: string): Promise<tb_Colaboradores | null> {
    const colaborador = this.items.find(
      (colaborador) => colaborador.Email === email,
    )

    if (!colaborador) {
      return null
    }

    return colaborador
  }

  async criar(data: CriarColaboradorInputDTO) {
    const colaborador: tb_Colaboradores = {
      Id: Math.floor(Math.random() * 10),
      Acao: 'Check In',
      Administrador: data.Administrador,
      Admissao_Data: '',
      Ativo: 'Sim',
      Brigadista: 'Nao',
      CheckIn: 1,
      CheckIn_Browser: '',
      CheckIn_Date: new Date(),
      CheckIn_IP: '',
      CheckIn_Session: '',
      CheckIn_Status: '',
      Cidade: '',
      Cor: '',
      Email: data.Email,
      Empresa: 'DECATLHON',
      Endereco: '',
      Formacao_Data: '',
      Funcao: '',
      Funcao_Sigla: '',
      Id_Key: randomUUID(),
      Id_Universo: data.Id_Universo,
      Insert_Date: '',
      Insert_User: '',
      Jornada_Sigla: '',
      Loja_Sigla: data.Loja_Sigla,
      Nome: data.Nome,
      Observacao: '',
      Qtd_Ativo: 0,
      Qtd_Ausente: 0,
      Qtd_Brigadista: 0,
      Qtd_Colaborador: 0,
      Qtd_Nao_Brigadista: 0,
      Qtd_Presente: 0,
      Qtd_Terceiro: 0,
      Qtd_Visitante: 0,
      Senha: data.Senha,
      Status: 'Presente',
      Telefone: '',
      Tipo: 'Colaborador',
      UF: 'UF',
      Update_Date: '',
      Update_User: '',
    }

    this.items.push(colaborador)

    return colaborador
  }

  checkIn(id: number, data: ColaboradorCheckInInputDto): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async listarColaboradoresPorTipoOuUniverso(
    data: IListarColaboradoresParams,
  ): Promise<tb_Colaboradores[]> {
    const colaboradores = this.items.filter(
      (colaborador) =>
        colaborador.Id_Universo === data.universoId ||
        colaborador.Tipo === data.tipo,
    )

    return colaboradores
  }

  updateAdmin(id: string, Administrador: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  desativarColaborador(
    id: number,
    data: DesativarColaboradorDto,
  ): Promise<void> {
    throw new Error('Method not implemented.')
  }

  informacaoColaboradores(nome: string): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async editar(data: tb_Colaboradores): Promise<tb_Colaboradores> {
    const colaboradorIndex = this.items.findIndex(
      (colaborador) => colaborador.Id === data.Id,
    )

    if (colaboradorIndex >= 0) {
      this.items[colaboradorIndex] = data
    }

    return data
  }
}
