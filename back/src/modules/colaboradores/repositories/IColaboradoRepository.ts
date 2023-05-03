import { tb_Colaboradores } from '@prisma/client'
import {
  ColaboradorCheckInInputDto,
  CriarColaboradorInputDTO,
  DesativarColaboradorDto,
} from '../dto'

export interface IListarColaboradoresParams {
  sigla?: string | undefined
  tipo: string | null
  universoId: number | null
}

export interface IColaboradorRepository {
  buscarPorId(id: number): Promise<
    | (tb_Colaboradores & {
        tb_universos: {
          Id: number
          Universo: string
        } | null
      })
    | null
  >
  buscarPorEmail(email: string, loja: string): Promise<tb_Colaboradores | null>
  criar(data: CriarColaboradorInputDTO): Promise<tb_Colaboradores>
  checkIn(id: number, data: ColaboradorCheckInInputDto): Promise<void>
  listarColaboradoresPorTipoOuUniverso(
    data: IListarColaboradoresParams,
  ): Promise<tb_Colaboradores[]>
  updateAdmin(id: string, Administrador: string): Promise<void>
  desativarColaborador(id: number, data: DesativarColaboradorDto): Promise<void>
  informacaoColaboradores(nome: string): Promise<any>
  editar(data: tb_Colaboradores): Promise<tb_Colaboradores>
}
