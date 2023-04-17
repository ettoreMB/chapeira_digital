import { ColaboradoresRepositoryInMemory } from '@modules/colaboradores/infra/in-memory/colaboradores-repository-inMemory'
import { AppErrors } from '@shared/errors/AppErros'

import { expect, describe, it, beforeEach } from 'vitest'
import { EditarColaboradorUseCase } from '../editarColaboradorUseCase'

let colaboradoresRepository: ColaboradoresRepositoryInMemory
let sut: EditarColaboradorUseCase

describe('Editar Colaborador Usecase', () => {
  beforeEach(async () => {
    colaboradoresRepository = new ColaboradoresRepositoryInMemory()
    sut = new EditarColaboradorUseCase(colaboradoresRepository)
  })

  it('Deve Editar um colaborador', async () => {
    const colaborador = await colaboradoresRepository.criar({
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
    })
    await sut.execute({
      id: colaborador.Id,
      admin: 'Nao',
      admissao: '',
      brigadista: 'Sim',
      cidade: 'sao paulo',
      email: 'teste@teste.com',
      endereco: 'rua teste',
      formacao: '',
      funcao: 'funcao',
      nome: 'testeNome',
      observacao: 'observacao',
      telefone: '1234',
      uf: 'uf',
      universoId: 2,
    })

    expect(colaborador.Email).toEqual('teste@teste.com')
  })

  it('Não Deve Editar um colaborador inexistente', async () => {
    await expect(() =>
      sut.execute({
        id: 2,
        admin: 'Nao',
        admissao: '',
        brigadista: 'Sim',
        cidade: 'sao paulo',
        email: 'teste@teste.com',
        endereco: 'rua teste',
        formacao: '',
        funcao: 'funcao',
        nome: 'testeNome',
        observacao: 'observacao',
        telefone: '1234',
        uf: 'uf',
        universoId: 2,
      }),
    ).rejects.toBeInstanceOf(AppErrors)
  })
})
