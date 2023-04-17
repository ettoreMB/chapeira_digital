import { ColaboradoresRepositoryInMemory } from '@modules/colaboradores/infra/in-memory/colaboradores-repository-inMemory'
import { AppErrors } from '@shared/errors/AppErros'

import { expect, describe, it, beforeEach } from 'vitest'
import { BuscarColaboradorPorIdUseCase } from '../buscarColaboradorPorIdUseCase'

let colaboradoresRepository: ColaboradoresRepositoryInMemory
let sut: BuscarColaboradorPorIdUseCase

describe('Buscar por id', () => {
  beforeEach(async () => {
    colaboradoresRepository = new ColaboradoresRepositoryInMemory()
    sut = new BuscarColaboradorPorIdUseCase(colaboradoresRepository)
  })

  it('Deve acahr um colaborador', async () => {
    const { Id } = await colaboradoresRepository.criar({
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

    await expect(() => sut.execute(Id)).toMatchObject({
      Email: 'teste@test',
    })
  })

  it('Não Deve acahr um colaborador', async () => {
    await expect(() => sut.execute(1)).rejects.toBeInstanceOf(AppErrors)
  })
})
