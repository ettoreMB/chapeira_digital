import { ColaboradoresRepositoryInMemory } from '@modules/colaboradores/infra/in-memory/colaboradores-repository-inMemory'
import { IColaboradorRepository } from '@modules/colaboradores/repositories/IColaboradoRepository'
import { UniversosRepositoryInMemory } from '@modules/universos/infra/in-memory/universos-repository-inMemory'
import { AppErrors } from '@shared/errors/AppErros'

import { expect, describe, it, beforeEach } from 'vitest'
import { DeletarUniversoUsecase } from './deletarUniversoUsecase'

let universosRepository: UniversosRepositoryInMemory
let colaboradoresRepository: IColaboradorRepository
let sut: DeletarUniversoUsecase
describe('Criar Loja Usecase', () => {
  beforeEach(() => {
    universosRepository = new UniversosRepositoryInMemory()
    colaboradoresRepository = new ColaboradoresRepositoryInMemory()
    sut = new DeletarUniversoUsecase(
      universosRepository,
      colaboradoresRepository,
    )
  })

  it('Deve deletar um universo', async () => {
    const { Id } = await universosRepository.criar({
      Andar: '0',
      Loja_Sigla: 'test-t',
      Universo: 'teste',
      Zona: '0',
    })

    await sut.execute(Id)

    expect(await universosRepository.buscarPorId(Id)).toBe(null)
  })

  it('Nao Deve ser possivel deletar um universo de  nao registrado', async () => {
    const { Id } = await universosRepository.criar({
      Andar: '0',
      Loja_Sigla: 'teste',
      Universo: 'teste',
      Zona: '0',
    })

    await expect(sut.execute(Id + 2)).rejects.toBeInstanceOf(AppErrors)
  })

  it('Nao Deve ser possivel deletar um universo de  com colaboradores registrados no universo', async () => {
    const universo = await universosRepository.criar({
      Andar: '0',
      Loja_Sigla: 't-teste',
      Universo: 'u-teste',
      Zona: '0',
    })
    await colaboradoresRepository.criar({
      Administrador: 'Nao',
      Brigadista: 'Nao',
      Email: 'teste@teste',
      Formacao_Data: '',
      Funcao: '',
      Id_Universo: universo.Id,
      Nome: 'colaborador',
      Loja_Sigla: 't-teste',
      Senha: '123',
      Tipo: 'Colaborador',
    })

    expect(async () => {
      await sut.execute(universo.Id)
    }).rejects.toBeInstanceOf(AppErrors)
  })
})
