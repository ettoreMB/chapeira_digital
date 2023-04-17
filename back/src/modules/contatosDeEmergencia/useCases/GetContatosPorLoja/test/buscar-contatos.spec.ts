import { InMemoryContatosDeEmergenciaRepository } from '@modules/contatosDeEmergencia/infra/in-memory/InMemoryContatosDeEmergenciaRepository'

import { expect, describe, it, beforeEach } from 'vitest'
import { BuscarContatosContatosUseCase } from '../BuscarContatosUseCase'

let contatoDeEmergenciaRepository: InMemoryContatosDeEmergenciaRepository
let sut: BuscarContatosContatosUseCase
describe('Criar Contato de Emergecia Usecase', () => {
  beforeEach(() => {
    contatoDeEmergenciaRepository = new InMemoryContatosDeEmergenciaRepository()
    sut = new BuscarContatosContatosUseCase(contatoDeEmergenciaRepository)
  })

  it('Deve Criar um contato de emergencia', async () => {
    await contatoDeEmergenciaRepository.criar({
      Contato: 'contato',
      Descricao: 'descrição',
      Endereco: 'endereco',
      Insert_Date: new Date(),
      Loja_Sigla: 'siglaTeste',
      Telefone: '123',
    })
    const contatos = await sut.execute('siglaTeste')

    expect(contatos.length).equal(1)
  })
})
