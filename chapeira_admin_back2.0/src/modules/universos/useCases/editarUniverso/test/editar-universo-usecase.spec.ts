import { UniversosRepositoryInMemory } from '@modules/universos/infra/in-memory/universos-repository-inMemory'
import { AppErrors } from '@shared/errors/AppErros'

import { expect, describe, it, beforeEach } from 'vitest'
import { EditarUniversoUsecase } from '../editarUniversoUsecase'

let universosRepository: UniversosRepositoryInMemory
let sut: EditarUniversoUsecase
describe('Editar Universo Usecase', () => {
  beforeEach(() => {
    universosRepository = new UniversosRepositoryInMemory()
    sut = new EditarUniversoUsecase(universosRepository)
  })

  it('Deve editar um universo', async () => {
    const universo = await universosRepository.criar({
      Andar: '0',
      Zona: '0',
      Loja_Sigla: 'sigla',
      Universo: 'universo',
    })

    await sut.execute({
      Andar: '1',
      Universo: 'universoTeste',
      Zona: '1',
      id: universo.Id,
    })

    expect(universo.Zona).toBe('1')
    expect(universo.Andar).toBe('1')
    expect(universo.Universo).toBe('universoTeste')
  })
  it('Não Deve editar um universo não existente', async () => {
    expect(() =>
      sut.execute({
        Andar: '1',
        Universo: 'universoTeste',
        Zona: '1',
        id: 123,
      }),
    ).rejects.toBeInstanceOf(AppErrors)
  })
})
