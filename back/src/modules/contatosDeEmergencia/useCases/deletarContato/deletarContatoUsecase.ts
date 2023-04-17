import { IContatosEmergenciaRepository } from '@modules/contatosDeEmergencia/repositories/IContatosEmergenciaRepositoy'
import { AppErrors } from '@shared/errors/AppErros'

export class DeletarContatoUseCase {
  constructor(private contatoRepository: IContatosEmergenciaRepository) {}

  async execute(id: number) {
    const contato = await this.contatoRepository.buscarPorId(id)

    if (!contato) {
      throw new AppErrors('Contato não encontrado')
    }

    await this.contatoRepository.deletar(contato.Id)
  }
}
