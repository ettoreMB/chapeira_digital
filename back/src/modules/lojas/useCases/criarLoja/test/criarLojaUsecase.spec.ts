import { CidadeRepositoryInMemory } from '@modules/cidades/infra/in-memory/cidades-repository-inMemory'
import { ColaboradoresRepositoryInMemory } from '@modules/colaboradores/infra/in-memory/colaboradores-repository-inMemory'

import { LojasRepositoryInMemory } from '@modules/lojas/infra/in-memory/lojas-repository-in-memory'
import { UniversosRepositoryInMemory } from '@modules/universos/infra/in-memory/universos-repository-inMemory'
import { AppErrors } from '@shared/errors/AppErros'

import { expect, describe, it, beforeEach } from 'vitest'
import { CriarLojaUsecase } from '../criarLojaUsecase'

let lojaRepository: LojasRepositoryInMemory
let cidadesRepository: CidadeRepositoryInMemory
let universosRepository: UniversosRepositoryInMemory
let colaboradorRepository: ColaboradoresRepositoryInMemory
let criarLojaUseCase: CriarLojaUsecase
const sigla = 'siglaTeste'
describe('Criar Loja Usecase', () => {
  beforeEach(async () => {
    lojaRepository = new LojasRepositoryInMemory()
    cidadesRepository = new CidadeRepositoryInMemory()
    universosRepository = new UniversosRepositoryInMemory()
    colaboradorRepository = new ColaboradoresRepositoryInMemory()
    criarLojaUseCase = new CriarLojaUsecase(
      lojaRepository,
      cidadesRepository,
      colaboradorRepository,
      universosRepository,
    )

    lojaRepository.criar({
      CNPJ: 1234567891,
      Loja: 'loja-teste',
      Loja_Cidade: 'sao paulo',
      Loja_Endereco: 'rua teste, numero 123',
      Loja_Sigla: sigla,
      Loja_Telefone: '132456789',
      Loja_UF: 'SP',
      Responsavel: 'ettore',
      Responsavel_Email: 'ettore@ettore',
      Responsavel_Telefone: '12345678',
    })
  })

  it('Deve Criar uma loja', async () => {
    const loja = await criarLojaUseCase.execute({
      CNPJ: 11223344,
      Loja: 'lojaSigla',
      Loja_Cidade: 'sao paulo',
      Loja_Endereco: 'rua teste, numero 123',
      Loja_Sigla: 't-teste',
      Loja_Telefone: '132456789',
      Loja_UF: 'SP',
      Responsavel: 'ettore',
      Responsavel_Email: 'ettore@ettore',
      Responsavel_Telefone: '12345678',
    })

    expect(loja.URL).toEqual(expect.any(String))
  })

  it('Não deve criar uma loja com CNPJ já cadastrado', async () => {
    await criarLojaUseCase.execute({
      CNPJ: 123,
      Loja: 'loja-teste',
      Loja_Cidade: 'sao paulo',
      Loja_Endereco: 'rua teste, numero 123',
      Loja_Sigla: 't-teste1',
      Loja_Telefone: '132456789',
      Loja_UF: 'SP',
      Responsavel: 'ettore',
      Responsavel_Email: 'ettore@ettore',
      Responsavel_Telefone: '12345678',
    })

    await expect(() =>
      criarLojaUseCase.execute({
        CNPJ: 123,
        Loja: 'loja-teste',
        Loja_Cidade: 'sao paulo',
        Loja_Endereco: 'rua teste, numero 123',
        Loja_Sigla: 't-teste2',
        Loja_Telefone: '132456789',
        Loja_UF: 'SP',
        Responsavel: 'ettore',
        Responsavel_Email: 'ettore@ettore',
        Responsavel_Telefone: '12345678',
      }),
    ).rejects.toBeInstanceOf(AppErrors)
  })

  it('Não deve criar uma loja com a sigla já cadastrada', async () => {
    expect(async () => {
      await criarLojaUseCase.execute({
        CNPJ: 123456781,
        Loja: 'loja-teste',
        Loja_Cidade: 'sao paulo',
        Loja_Endereco: 'rua teste, numero 123',
        Loja_Sigla: sigla,
        Loja_Telefone: '132456789',
        Loja_UF: 'SP',
        Responsavel: 'ettore',
        Responsavel_Email: 'ettore@ettore',
        Responsavel_Telefone: '12345678',
      })
    }).rejects.toBeInstanceOf(AppErrors)
  })
})
