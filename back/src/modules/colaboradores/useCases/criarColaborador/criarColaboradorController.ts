import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class CriarColaboradorController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const reqBody = z.object({
      lojaSigla: z.string(),
      nome: z.string(),
      email: z.string().nullable(),
      tipo: z.enum(['Colaborador', 'Visitante', 'Terceiro']),
      endereco: z.string().nullable(),
      telefone: z.string().nullable(),
      universoId: z.coerce.number(),
      funcao: z.string().nullable(),
      empresa: z.string().nullable(),
      administrador: z.enum(['Sim', 'Nao']).default('Nao'),
      brigadista: z.enum(['Sim', 'Nao']).default('Nao').nullable(),
      formacaoData: z.string().nullable(),
      admissaoData: z.string().nullable(),
      observacao: z.string().nullable(),
    })
    const {
      lojaSigla,
      nome,
      email,
      tipo,
      endereco,
      telefone,
      universoId,
      funcao,
      empresa,
      administrador,
      brigadista,
      formacaoData,
      admissaoData,
      observacao,
    } = reqBody.parse(req.body)

    const criarUsuarioUseCase = req.diScope.resolve('criarColaboradorUsecase')

    await criarUsuarioUseCase.execute({
      Loja_Sigla: lojaSigla,
      Nome: nome,
      Email: email,
      Tipo: tipo,
      Endereco: endereco,
      Telefone: telefone,
      Id_Universo: universoId,
      Funcao: funcao,
      Empresa: empresa,
      Administrador: administrador,
      Brigadista: brigadista,
      Formacao_Data: formacaoData,
      Admissao_Data: admissaoData,
      Observacao: observacao,
    })
    res.status(200).send({
      lojaSigla,
      universoId,
      tipo,
      nome,
      funcao,
      email,
      administrador,

      brigadista,
      formacaoData,
    })
  }
}
