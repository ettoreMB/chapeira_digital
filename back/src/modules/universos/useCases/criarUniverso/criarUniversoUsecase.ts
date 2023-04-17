import { CriarUniversoDTO } from '@modules/universos/dto'
import { IUniversoRepository } from '@modules/universos/repositories/IUniversoRepository'
import { tb_Universos } from '@prisma/client'
import { AppErrors } from '@shared/errors/AppErros'

interface ResponseCriarUniversoUseCase {
  universo: tb_Universos
}
export class CriarUniversoUsecase {
  constructor(private universoRepository: IUniversoRepository) {}

  async execute(data: CriarUniversoDTO): Promise<ResponseCriarUniversoUseCase> {
    const universoExiste =
      await this.universoRepository.buscarUniversoPorNomeELoja(
        data.Universo,
        data.Loja_Sigla,
      )

    if (universoExiste) {
      throw new AppErrors('Universo já cadastrado nesta loja', 409)
    }

    const universo = await this.universoRepository.criar({
      Loja_Sigla: data.Loja_Sigla,
      Universo: data.Universo,
      Zona: data.Zona,
      Andar: data.Andar,
    })

    return { universo }
  }
}
