import { InMemoryContatosDeEmergenciaRepository } from '@modules/contatosDeEmergencia/infra/in-memory/InMemoryContatosDeEmergenciaRepository'

import { expect, describe, it, beforeEach } from 'vitest'
import { DeletarContatoUseCase } from '../deletarContatoUsecase'

let contatoDeEmergenciaRepository: InMemoryContatosDeEmergenciaRepository
let sut: DeletarContatoUseCase
describe('Deletar Contato de Emergecia Usecase', () => {
  beforeEach(() => {
    contatoDeEmergenciaRepository = new InMemoryContatosDeEmergenciaRepository()
    sut = new DeletarContatoUseCase(contatoDeEmergenciaRepository)
  })

  it('Deve Deletar um contato de emergencia', async () => {
    await contatoDeEmergenciaRepository.criar({
      Id: 1,
      Descricao: '',
      Loja_Sigla: 'teste',
      Contato: 'nome1',
      Telefone: '123',
    })

    await sut.execute(1)

    const contatos = await contatoDeEmergenciaRepository.getAll('teste')

    expect(contatos).toHaveLength(0)
  })
})
