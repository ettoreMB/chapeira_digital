import { ColaboradoresRepositoryInMemory } from '@modules/colaboradores/infra/in-memory/colaboradores-repository-inMemory'
import { AppErrors } from '@shared/errors/AppErros'

import { expect, describe, it, beforeEach } from 'vitest'
import { CriarColaboradorUsecase } from '../criarColaboradorUsecase'

let colaboradoresRepository: ColaboradoresRepositoryInMemory
let sut: CriarColaboradorUsecase

describe('Criar Colaborador Usecase', () => {
  beforeEach(async () => {
    colaboradoresRepository = new ColaboradoresRepositoryInMemory()
    sut = new CriarColaboradorUsecase(colaboradoresRepository)
  })

  it('Deve Criar um colaborador', async () => {
    const colaborador = await sut.execute({
      Administrador: 'Nao',
      Brigadista: 'Nao',
      Email: 'teste@teste',
      Formacao_Data: '',
      Funcao: '',
      Id_Universo: 1,
      Loja_Sigla: 'loja-teste',
      Nome: 'testeNome',
      Senha: '123',
      Tipo: 'Colaborador',
      Admissao_Data: '',
      Empresa: '',
      Endereco: '',
      Observacao: '',
      Telefone: '',
    })

    expect(colaborador.Id).toEqual(expect.any(Number))
  })

  it('Não Deve Criar um colaborador com email já existente na loja', async () => {
    await sut.execute({
      Administrador: 'Nao',
      Brigadista: 'Nao',
      Email: 'teste@teste',
      Formacao_Data: '',
      Funcao: '',
      Id_Universo: 1,
      Loja_Sigla: 'loja-teste',
      Nome: 'testeNome',
      Senha: '123',
      Tipo: 'Colaborador',
      Admissao_Data: '',
      Empresa: '',
      Endereco: '',
      Observacao: '',
      Telefone: '',
    })

    await expect(() =>
      sut.execute({
        Administrador: 'Nao',
        Brigadista: 'Nao',
        Email: 'teste@teste',
        Formacao_Data: '',
        Funcao: '',
        Id_Universo: 1,
        Loja_Sigla: 'loja-teste',
        Nome: 'testeNome',
        Senha: '123',
        Tipo: 'Colaborador',
        Admissao_Data: '',
        Empresa: '',
        Endereco: '',
        Observacao: '',
        Telefone: '',
      }),
    ).rejects.toBeInstanceOf(AppErrors)
  })
})
