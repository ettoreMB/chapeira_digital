import { IContatosEmergenciaRepository } from '@modules/contatosDeEmergencia/repositories/IContatosEmergenciaRepositoy'
import { tb_Contatos_Emergencia } from '@prisma/client'
import { AppErrors } from '@shared/errors/AppErros'

interface ContatoEmergenciaRequestProps {
  lojaSigla: string
  nomeContato: string
  telefone: string
  descricao: string | null
}

interface ContatoEmergenciaResponsetProps {
  contato: tb_Contatos_Emergencia
}

export class CriarContatoDeEmergenciaUsecase {
  constructor(
    private contatosEmergenciaRepository: IContatosEmergenciaRepository,
  ) {}

  async execute(
    data: ContatoEmergenciaRequestProps,
  ): Promise<ContatoEmergenciaResponsetProps> {
    const contatoExiste =
      await this.contatosEmergenciaRepository.buscarPorNomeELoja(
        data.lojaSigla,
        data.nomeContato,
      )

    if (contatoExiste) {
      throw new AppErrors('Contato já cadastrado nesta loja', 400)
    }

    const contato = await this.contatosEmergenciaRepository.criar({
      Contato: data.nomeContato,
      Telefone: data.telefone,
      Descricao: data.descricao,
      Loja_Sigla: data.lojaSigla,
    })

    return { contato }
  }
}
