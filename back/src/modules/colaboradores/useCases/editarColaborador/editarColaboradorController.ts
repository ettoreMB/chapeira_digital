import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function editarColaborador(
  req: FastifyRequest,
  res: FastifyReply,
): Promise<FastifyReply> {
  const reqParamsSchema = z.object({
    id: z.coerce.number(),
  })

  const reqBodySchema = z.object({
    nome: z.string(),
    email: z.string(),
    tipo: z.string(),
    endereco: z.string().nullable(),
    telefone: z.string().nullable(),
    universoId: z.number(),
    funcao: z.string(),
    empresa: z.string().nullable(),
    administrador: z.string(),
    brigadista: z.string(),
    formacaoData: z.string().nullable(),
    admissaoData: z.string().nullable(),
    observacao: z.string().nullable(),
  })

  const editarColaboradorUsecase = req.diScope.resolve(
    'editarColaboradorUsecase',
  )

  const { id } = reqParamsSchema.parse(req.params)
  const data = reqBodySchema.parse(req.body)

  await editarColaboradorUsecase.execute({
    id,
    nome: data.nome,
    admin: data.administrador,
    admissao: data.admissaoData,
    brigadista: data.brigadista,
    email: data.email,
    empresa: data.empresa,
    endereco: data.endereco,
    formacao: data.formacaoData,
    funcao: data.funcao,
    observacao: data.observacao,
    telefone: data.telefone,
    universoId: data.universoId,
  })

  return res.status(200).send(`usuário editado com sucesso`)
}
