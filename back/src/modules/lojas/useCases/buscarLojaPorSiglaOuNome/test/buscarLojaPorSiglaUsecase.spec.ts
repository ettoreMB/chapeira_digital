import { LojasRepositoryInMemory } from '@modules/lojas/infra/in-memory/lojas-repository-in-memory'
import { AppErrors } from '@shared/errors/AppErros'
import { expect, describe, it, beforeEach } from 'vitest'
import { BuscarLojaPorSiglaOuNomeUsecase } from '../buscarLojaPorSiglaOuNomeUsecase'

let lojaRepository: LojasRepositoryInMemory
let sut: BuscarLojaPorSiglaOuNomeUsecase
const sigla = 'sigla-teste'
describe('Buscar Loja Por Sigla', () => {
  beforeEach(async () => {
    lojaRepository = new LojasRepositoryInMemory()
    sut = new BuscarLojaPorSiglaOuNomeUsecase(lojaRepository)

    await lojaRepository.criar({
      Loja_Sigla: 'sigla-teste',
      Loja: 'loja',
      Loja_Endereco: 'endereco',
      Loja_Telefone: 'data.Loja_Telefone',
      Responsavel: 'data.Responsavel',
      Responsavel_Email: 'data.Responsavel_Email',
      Responsavel_Telefone: 'data.Responsavel_Telefone',
      CNPJ: 12345678,
      Loja_Cidade: 'cidade',
      Loja_UF: 'uF',
    })
  })
  it('Deve encontrar uma loja pela Sigla da loja', async () => {
    const loja = await sut.execute(sigla)
    expect(loja?.sigla).toEqual('sigla-teste')
    expect(loja?.pastaWEB).toEqual('uF-loja')
  })
  it('Não deve achar uma loja no sistema', async () => {
    expect(async () => {
      await sut.execute('sigla')
    }).rejects.toBeInstanceOf(AppErrors)
  })
})
