import { UniversosRepositoryInMemory } from '@modules/universos/infra/in-memory/universos-repository-inMemory'
import { AppErrors } from '@shared/errors/AppErros'

import { expect, describe, it, beforeEach } from 'vitest'
import { CriarUniversoUsecase } from './criarUniversoUsecase'

let universosRepository: UniversosRepositoryInMemory
let sut: CriarUniversoUsecase
describe('Criar Loja Usecase', () => {
  beforeEach(() => {
    universosRepository = new UniversosRepositoryInMemory()
    sut = new CriarUniversoUsecase(universosRepository)
  })

  it('Deve Criar um universo', async () => {
    const { universo } = await sut.execute({
      Andar: '0',
      Loja_Sigla: 'Sigla',
      Universo: 'Teste',
      Zona: '0',
    })

    expect(universo.Id).toEqual(expect.any(Number))
  })

  it('Nao Deve Criar um universo com o mesmo nome cadastrado na mesma loja', async () => {
    await sut.execute({
      Andar: '0',
      Loja_Sigla: 'Sigla',
      Universo: 'Teste',
      Zona: '0',
    })

    expect(async () => {
      await sut.execute({
        Andar: '0',
        Loja_Sigla: 'Sigla',
        Universo: 'Teste',
        Zona: '0',
      })
    }).rejects.toBeInstanceOf(AppErrors)
  })
})
