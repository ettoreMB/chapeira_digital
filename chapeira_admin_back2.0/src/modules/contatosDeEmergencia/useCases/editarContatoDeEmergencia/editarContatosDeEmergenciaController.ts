import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function editarContatoDeEmergencia(
  req: FastifyRequest,
  res: FastifyReply,
): Promise<FastifyReply> {
  const reqBodySchema = z.object({
    id: z.coerce.number(),
    contato: z.string(),
    telefone: z.string(),
    descricao: z.string().nullable(),
    endereco: z.string().nullable(),
  })

  const editarContatoUseCase = req.diScope.resolve('editarContatoDeEmergencia')
  const { id, descricao, contato, telefone, endereco } = reqBodySchema.parse(
    req.body,
  )

  await editarContatoUseCase.execute({
    id,
    descricao,
    contato,
    telefone,
    endereco,
  })
  return res.status(201).send('Contato editado com sucesso ')
}
