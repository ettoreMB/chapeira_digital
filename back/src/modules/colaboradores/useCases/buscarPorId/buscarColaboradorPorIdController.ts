import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function buscarColaboradorPorId(
  req: FastifyRequest,
  res: FastifyReply,
): Promise<FastifyReply> {
  const reqParamsSchema = z.object({
    id: z.coerce.number(),
  })
  const { id } = reqParamsSchema.parse(req.params)
  const buscarColaboradorPorId = req.diScope.resolve(
    'buscarColaboradorPorIdUseCase',
  )

  const colaborador = await buscarColaboradorPorId.execute(id)
  return res.status(200).send(colaborador)
}
