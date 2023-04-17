import { LojaNaoEncontradaErro } from '@modules/lojas/errors/lojaNaoEcontradaErro'
import { LojasRepositoryInMemory } from '@modules/lojas/infra/in-memory/lojas-repository-in-memory'
import { expect, describe, it, beforeEach } from 'vitest'

import { EditarLojaUsecase } from '../editarLojaUsecase'

let lojaRepository: LojasRepositoryInMemory
let sut: EditarLojaUsecase
const sigla = 'sigla-teste'
describe('Editar loja', () => {
  beforeEach(async () => {
    lojaRepository = new LojasRepositoryInMemory()
    sut = new EditarLojaUsecase(lojaRepository)

    await lojaRepository.criar({
      Loja_Sigla: 'sigla-teste',
      Loja: sigla,
      Loja_Endereco: 'endereco',
      Loja_Telefone: '',
      Responsavel: 'data.Responsavel',
      Responsavel_Email: 'data.Responsavel_Email',
      Responsavel_Telefone: 'data.Responsavel_Telefone',
      CNPJ: 12345678,
      Loja_Cidade: 'cidade',
      Loja_UF: 'UF',
    })
  })
  it('Deve editar as informações da loja', async () => {
    const loja = await sut.execute(sigla, {
      Loja_Endereco: 'novo_endereco',
      Loja_Horario: '12 as 13',
      Loja_Telefone: '1234456',
    })
    expect(loja.Loja_Telefone).toBe('1234456')
    expect(loja.Loja_Endereco).toBe('novo_endereco')
  })
  it('Não deve encontrar uma loja nao cadastrada', async () => {
    await expect(async () => {
      await sut.execute('testeLoja', {
        Loja_Endereco: 'novo_endereco',
        Loja_Horario: '12 as 13',
        Loja_Telefone: '1234456',
      })
    }).rejects.toBeInstanceOf(LojaNaoEncontradaErro)
  })
})
