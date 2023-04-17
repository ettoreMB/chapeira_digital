import { IContatosEmergenciaRepository } from '@modules/contatosDeEmergencia/repositories/IContatosEmergenciaRepositoy'
import { tb_Contatos_Emergencia } from '@prisma/client'
import { AppErrors } from '@shared/errors/AppErros'

export class BuscarContatosContatosUseCase {
  constructor(
    private contatosEmergenciaRepository: IContatosEmergenciaRepository,
  ) {}

  async execute(sigla: string): Promise<tb_Contatos_Emergencia[]> {
    if (!sigla) {
      throw new AppErrors('Sigla da loja inválida')
    }

    const contacts = await this.contatosEmergenciaRepository.getAll(sigla)

    return contacts
  }
}
