import { ICidadesRepository } from '@modules/cidades/repositories/ICidadesRepository'
import { IColaboradorRepository } from '@modules/colaboradores/repositories/IColaboradoRepository'
import { CriarLojaDTO } from '@modules/lojas/dtos'
import { ILojaInterface } from '@modules/lojas/repositories/IlojaRepository'
import { IUniversoRepository } from '@modules/universos/repositories/IUniversoRepository'
import { AppErrors } from '@shared/errors/AppErros'

export class CriarLojaUsecase {
  constructor(
    private lojasRepository: ILojaInterface,
    private cidadesRepository: ICidadesRepository,
    private colaboradorRepository: IColaboradorRepository,
    private universosRepository: IUniversoRepository,
  ) {}

  async execute(data: CriarLojaDTO): Promise<any> {
    const siglaExiste = await this.lojasRepository.buscarPorSiglaOuNome(
      data.Loja_Sigla,
    )

    if (siglaExiste) {
      throw new AppErrors('Sigla já cadastrada no sistema')
    }

    const cnpjExiste = await this.lojasRepository.buscarPorCnpj(data.CNPJ)

    if (cnpjExiste) {
      throw new AppErrors('CNPJ Já cadastrado')
    }

    const cidadeExiste = await this.cidadesRepository.buscarPorCidade(
      data.Loja_Cidade,
    )

    if (!cidadeExiste) {
      await this.cidadesRepository.criar({
        cidade: data.Loja_Cidade,
        estadoSigla: data.Loja_UF,
      })
    }
    const loja = await this.lojasRepository.criar({
      CNPJ: data.CNPJ,
      Loja: data.Loja,
      Loja_Endereco: data.Loja_Endereco,
      Responsavel: data.Responsavel,
      Loja_Cidade: data.Loja_Cidade,
      Loja_Sigla: data.Loja_Sigla,
      Loja_Telefone: data.Loja_Telefone,
      Loja_UF: data.Loja_UF,
      Responsavel_Email: data.Responsavel_Email,
      Responsavel_Telefone: data.Responsavel_Telefone,
    })
    const universo = await this.universosRepository.criar({
      Loja_Sigla: data.Loja_Sigla,
      Andar: '0',
      Zona: '0',
      Universo: 'ADM',
    })
    await this.colaboradorRepository.criar({
      Loja_Sigla: data.Loja_Sigla,
      Administrador: 'Sim',
      Email: data.Responsavel_Email,
      Brigadista: 'Nao',
      Formacao_Data: '',
      Funcao: 'Administrador',
      Id_Universo: universo.Id,
      Nome: data.Responsavel,
      Senha: 'chapeira@chapeira',
      Observacao: '',
      Admissao_Data: '',
      Empresa: 'DECATHLON',
      Endereco: '',
      Telefone: '',
      Tipo: 'Colaborador',
    })
    return loja
  }
}
