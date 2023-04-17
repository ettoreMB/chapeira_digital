import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function buscarUniversoPorId(
  req: FastifyRequest,
  res: FastifyReply,
): Promise<FastifyReply> {
  const reqParamsSchema = z.object({
    id: z.coerce.number(),
  })

  const { id } = reqParamsSchema.parse(req.params)

  const buscarUniversoPorIdUseCase = req.diScope.resolve(
    'buscarUniversoPorIdUSecase',
  )

  const universo = await buscarUniversoPorIdUseCase.execute(id)

  return res.status(200).send(universo)
}
