import { LojasRepositoryInMemory } from '@modules/lojas/infra/in-memory/lojas-repository-in-memory'
import { LojaRepository } from '@modules/lojas/infra/prisma/lojaRepository'
import { UniversosRepositoryInMemory } from '@modules/universos/infra/in-memory/universos-repository-inMemory'
import { AppErrors } from '@shared/errors/AppErros'

import { expect, describe, it, beforeEach } from 'vitest'
import { CriarUniversoUsecase } from '../criarUniverso/criarUniversoUsecase'
import { ListarUniversosPorLojaUsecase } from './listarUniversosPorLojaUsecase'

let universosRepository: UniversosRepositoryInMemory

let lojasRepository: LojaRepository
let criarUniversoUseCae: CriarUniversoUsecase
let sut: ListarUniversosPorLojaUsecase
describe('Criar Loja Usecase', () => {
  beforeEach(() => {
    universosRepository = new UniversosRepositoryInMemory()
    lojasRepository = new LojasRepositoryInMemory()
    criarUniversoUseCae = new CriarUniversoUsecase(universosRepository)
    sut = new ListarUniversosPorLojaUsecase(
      universosRepository,
      lojasRepository,
    )
  })

  it('Deve listar os universos de uma loja', async () => {
    await lojasRepository.criar({
      CNPJ: 123,
      Loja: 'teste',
      Loja_Cidade: 'cidade',
      Loja_Endereco: 'rua endereco',
      Loja_Sigla: 'l-sigla',
      Loja_Telefone: '123',
      Loja_UF: 'sp',
      Responsavel: 'ettore',
      Responsavel_Email: 'ettore@ettore',
      Responsavel_Telefone: '123',
    })
    await criarUniversoUseCae.execute({
      Andar: '0',
      Zona: '0',
      Loja_Sigla: 'l-sigla',
      Universo: 'universo-teste',
    })

    const universos = await sut.execute('l-sigla')

    expect(universos.length).greaterThan(0)
  })

  it('Deve retornar um erro caso a loja não exista', async () => {
    await criarUniversoUseCae.execute({
      Andar: '0',
      Zona: '0',
      Loja_Sigla: 'l-sigla',
      Universo: 'universo-teste',
    })

    expect(async () => {
      await sut.execute('l-sigla')
    }).rejects.toBeInstanceOf(AppErrors)
  })
})
