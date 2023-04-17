import { IColaboradorRepository } from '@modules/colaboradores/repositories/IColaboradoRepository'
import { AppErrors } from '@shared/errors/AppErros'

interface ColaboradorRequestProps {
  id: number
  nome: string
  admin: string
  universoId: number
  brigadista: string
  formacao: string | null
  admissao: string | null
  email: string
  telefone: string | null
  funcao: string | null
  endereco: string | null
  empresa: string | null
  observacao: string | null
}

export class EditarColaboradorUseCase {
  constructor(private colabotadoresRepository: IColaboradorRepository) {}

  async execute(data: ColaboradorRequestProps) {
    const colaborador = await this.colabotadoresRepository.buscarPorId(data.id)

    if (!colaborador) {
      throw new AppErrors('Colaborador não encontrado', 404)
    }

    colaborador.Nome = data.nome
    colaborador.Administrador = data.admin
    colaborador.Id_Universo = data.universoId
    colaborador.Brigadista = data.brigadista
    colaborador.Formacao_Data = data.formacao
    colaborador.Admissao_Data = data.admissao
    colaborador.Email = data.email
    colaborador.Telefone = data.telefone
    colaborador.Funcao = data.funcao
    colaborador.Endereco = data.endereco
    colaborador.Observacao = data.observacao
    colaborador.Empresa = data.empresa

    try {
      await this.colabotadoresRepository.editar(colaborador)

      return colaborador
    } catch (error) {
      throw new AppErrors('Erro ao editar usuário')
    }
  }
}
