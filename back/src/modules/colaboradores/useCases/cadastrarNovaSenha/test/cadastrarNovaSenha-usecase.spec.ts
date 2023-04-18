import { ColaboradoresRepositoryInMemory } from '@modules/colaboradores/infra/in-memory/colaboradores-repository-inMemory'

import { expect, describe, it, beforeEach } from 'vitest'

import { CadastrarNovaSenhaUseCase } from '../cadastrarNovaSenhaUseCase'
import { LojasRepositoryInMemory } from '@modules/lojas/infra/in-memory/lojas-repository-in-memory'
import { createSigner } from 'fast-jwt'

let colaboradoresRepository: ColaboradoresRepositoryInMemory
let lojasRepository: LojasRepositoryInMemory
let sut: CadastrarNovaSenhaUseCase

describe('Cadastrar nova senha Usecase', () => {
  beforeEach(async () => {
    colaboradoresRepository = new ColaboradoresRepositoryInMemory()
    lojasRepository = new LojasRepositoryInMemory()
    sut = new CadastrarNovaSenhaUseCase(
      colaboradoresRepository,
      lojasRepository,
    )
  })

  it('Deve Trocar a senha', async () => {
    const loja = await lojasRepository.criar({
      CNPJ: 1123,
      Loja: 'lojateste',
      Loja_Cidade: 'sp',
      Loja_Endereco: 'end',
      Loja_Sigla: 'lojateste',
      Loja_Telefone: '123',
      Loja_UF: 'sp',
      Responsavel: 'eu',
      Responsavel_Email: 'mail',
      Responsavel_Telefone: '123',
    })

    loja.Pasta_WEB = 'lojateste'
    const colaborador = await colaboradoresRepository.criar({
      Administrador: 'Sim',
      Brigadista: 'Nao',
      Email: 'teste@teste',
      Formacao_Data: '',
      Funcao: '',
      Id_Universo: 1,
      Loja_Sigla: 'lojateste',
      Nome: 'testeNome',
      Senha: '123',
      Tipo: 'Colaborador',
      Admissao_Data: '',
      Empresa: 'decathlon',
      Endereco: '',
      Observacao: '',
      Telefone: '',
    })

    const signSync = createSigner({ key: 'secret' })
    const token = signSync({ sub: 'teste@teste', b: 2, c: 3 })
    await sut.execute(token, 'chapeira', 'lojateste')

    expect(colaborador.Senha).toEqual('chapeira')
  })

  // it('Não Deve Editar um colaborador inexistente', async () => {
  //   await expect(() =>
  //     sut.execute({
  //       id: 2,
  //       admin: 'Nao',
  //       admissao: '',
  //       brigadista: 'Sim',
  //       email: 'teste@teste.com',
  //       endereco: 'rua teste',
  //       formacao: '',
  //       funcao: 'funcao',
  //       nome: 'testeNome',
  //       observacao: 'observacao',
  //       telefone: '1234',
  //       empresa: '',
  //       universoId: 2,
  //     }),
  //   ).rejects.toBeInstanceOf(AppErrors)
  // })
})
