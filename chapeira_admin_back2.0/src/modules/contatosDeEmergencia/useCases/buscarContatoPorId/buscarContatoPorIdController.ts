import { FastifyReply, FastifyRequest } from 'fastify'
import { coerce, z } from 'zod'

export async function buscarContatoPorId(
  req: FastifyRequest,
  res: FastifyReply,
): Promise<FastifyReply> {
  const reqParamsSchema = z.object({
    id: coerce.number(),
  })
  const { id } = reqParamsSchema.parse(req.params)
  const buscarContatoPorIdUsecase = req.diScope.resolve('buscarContatoPorId')

  const contato = await buscarContatoPorIdUsecase.execute(id)
  return res.status(200).send(contato)
}
