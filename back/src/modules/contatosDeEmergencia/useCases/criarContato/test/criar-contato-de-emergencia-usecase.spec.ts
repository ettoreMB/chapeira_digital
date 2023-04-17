import { InMemoryContatosDeEmergenciaRepository } from '@modules/contatosDeEmergencia/infra/in-memory/InMemoryContatosDeEmergenciaRepository'

import { expect, describe, it, beforeEach } from 'vitest'
import { CriarContatoDeEmergenciaUsecase } from '../criarContatoDeEmergenciaUsecase'

let contatoDeEmergenciaRepository: InMemoryContatosDeEmergenciaRepository
let sut: CriarContatoDeEmergenciaUsecase
describe('Criar Contato de Emergecia Usecase', () => {
  beforeEach(() => {
    contatoDeEmergenciaRepository = new InMemoryContatosDeEmergenciaRepository()
    sut = new CriarContatoDeEmergenciaUsecase(contatoDeEmergenciaRepository)
  })

  it('Deve Criar um contato de emergencia', async () => {
    const { contato } = await sut.execute({
      descricao: '',
      lojaSigla: 'teste',
      nomeContato: 'nome',
      telefone: '123',
    })

    expect(contato.Id).toEqual(expect.any(Number))
  })
})
