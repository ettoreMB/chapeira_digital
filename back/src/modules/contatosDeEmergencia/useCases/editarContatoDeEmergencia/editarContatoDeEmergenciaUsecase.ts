import { IContatosEmergenciaRepository } from '@modules/contatosDeEmergencia/repositories/IContatosEmergenciaRepositoy'
import { AppErrors } from '@shared/errors/AppErros'

interface EditarContatoDeEmergenciaRequestProps {
  id: number
  contato: string
  descricao: string | null
  telefone: string
  endereco: string | null
}

export class EditarContatoDeEmergenciaUsecase {
  constructor(
    private contatosDeEmergenciaRepository: IContatosEmergenciaRepository,
  ) {}

  async execute(data: EditarContatoDeEmergenciaRequestProps) {
    const contato = await this.contatosDeEmergenciaRepository.buscarPorId(
      data.id,
    )

    if (!contato) {
      throw new AppErrors('Contato não encontrado', 404)
    }

    contato.Contato = data.contato
    contato.Descricao = data.descricao
    contato.Telefone = data.telefone
    contato.Endereco = data.endereco

    await this.contatosDeEmergenciaRepository.editar(contato)
  }
}
