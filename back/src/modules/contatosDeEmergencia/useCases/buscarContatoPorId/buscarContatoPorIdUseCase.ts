import { IContatosEmergenciaRepository } from '@modules/contatosDeEmergencia/repositories/IContatosEmergenciaRepositoy'
import { AppErrors } from '@shared/errors/AppErros'

export class BuscarContatoPorIdUseCase {
  constructor(private contatosDeEmergencia: IContatosEmergenciaRepository) {}

  async execute(id: number) {
    const contato = await this.contatosDeEmergencia.buscarPorId(id)

    if (!contato) {
      throw new AppErrors('Contato não encontrado', 404)
    }

    return contato
  }
}
