import { InMemoryContatosDeEmergenciaRepository } from '@modules/contatosDeEmergencia/infra/in-memory/InMemoryContatosDeEmergenciaRepository'
import { AppErrors } from '@shared/errors/AppErros'

import { expect, describe, it, beforeEach } from 'vitest'
import { EditarContatoDeEmergenciaUsecase } from '../editarContatoDeEmergenciaUsecase'

let contatoDeEmergenciaRepository: InMemoryContatosDeEmergenciaRepository
let sut: EditarContatoDeEmergenciaUsecase
describe('Criar Contato de Emergecia Usecase', () => {
  beforeEach(() => {
    contatoDeEmergenciaRepository = new InMemoryContatosDeEmergenciaRepository()
    sut = new EditarContatoDeEmergenciaUsecase(contatoDeEmergenciaRepository)
  })

  it('Deve Editar um contato de emergencia', async () => {
    const contato = await contatoDeEmergenciaRepository.criar({
      Contato: 'contato',
      Descricao: 'descrição',
      Endereco: 'endereco',
      Insert_Date: new Date(),
      Loja_Sigla: 'siglaTeste',
      Telefone: '123',
    })
    await sut.execute({
      id: contato.Id,
      descricao: '',
      endereco: 'endereco',
      contato: 'nome',
      telefone: '123',
    })

    expect(contato.Contato).toEqual('nome')
  })

  it('Não Deve Editar um contato de não existente', async () => {
    await expect(() =>
      sut.execute({
        id: 1,
        descricao: '',
        endereco: 'endereco',
        contato: 'nome',
        telefone: '123',
      }),
    ).rejects.toBeInstanceOf(AppErrors)
  })
})
