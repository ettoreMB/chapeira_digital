import { FastifyReply, FastifyRequest } from 'fastify'
import { coerce, z } from 'zod'

export async function editarLoja(
  req: FastifyRequest,
  res: FastifyReply,
): Promise<FastifyReply> {
  const reqParamSchema = z.object({
    id: coerce.number(),
  })
  const reqBodySchema = z.object({
    endereco: z.string(),
    telefone: z.string().nullable(),
    cidade: z.string(),
    horario: z.string().nullable(),
  })

  const { id } = reqParamSchema.parse(req.params)
  const { cidade, endereco, horario, telefone } = reqBodySchema.parse(req.body)

  const editarLojaUsecase = req.diScope.resolve('editarLojaUsecase')

  await editarLojaUsecase.execute(id, {
    Loja_Endereco: endereco,
    Loja_Horario: horario,
    Loja_Telefone: telefone,
    Loja_Cidade: cidade,
  })
  return res.status(200).send()
}
