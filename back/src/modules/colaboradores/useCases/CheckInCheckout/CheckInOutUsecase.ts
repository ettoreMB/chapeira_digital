import { ColaboradorCheckInInputDto } from '@modules/colaboradores/dto'
import { IColaboradorRepository } from '@modules/colaboradores/repositories/IColaboradoRepository'

import { AppErrors } from '@shared/errors/AppErros'

export interface OutPutProps {
  nome: string | null
  acao: string | null
  data: Date | null
}

export class CheckInOutUsecase {
  constructor(private colaboradoresRepository: IColaboradorRepository) {}

  async execute(id: number, ip: string, browser: string): Promise<OutPutProps> {
    const colaborador = await this.colaboradoresRepository.buscarPorId(id)

    if (!colaborador) {
      throw new AppErrors('colaborador não encontrado', 404)
    }

    if (colaborador.Ativo === 'Nao') {
      throw new AppErrors('este colaborador não está ativo', 404)
    }

    const data: ColaboradorCheckInInputDto = {
      checkIn:
        colaborador.CheckIn === 1
          ? (colaborador.CheckIn = 0)
          : (colaborador.CheckIn = 1),
      status:
        colaborador.Status === 'Presente'
          ? (colaborador.Status = 'Presente')
          : (colaborador.Status = 'Ausente'),
      checkInStatus:
        colaborador.CheckIn_Status === 'Presente'
          ? (colaborador.CheckIn_Status = 'Presente')
          : (colaborador.CheckIn_Status = 'Ausente'),
      acao:
        colaborador.Acao === 'Chek Out'
          ? (colaborador.Acao = 'Chek In')
          : (colaborador.Acao = 'Chek Out'),
      cor:
        colaborador.Cor === 'success'
          ? (colaborador.Cor = 'success')
          : (colaborador.Cor = 'Danger'),
      checkInDate: new Date(),
      ip,
      browser,
    }

    await this.colaboradoresRepository.checkIn(id, data)

    const output = {
      nome: colaborador.Nome,
      acao: colaborador.Acao,
      data: colaborador.CheckIn_Date,
      status: colaborador.Status,
      universo: colaborador.tb_universos?.Universo,
    }
    return output
  }
}
