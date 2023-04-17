import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deletarContato(
  req: FastifyRequest,
  res: FastifyReply,
): Promise<FastifyReply> {
  const reqParams = z.object({
    id: z.coerce.number(),
  })

  const { id } = reqParams.parse(req.params)

  const deletarContatoUseCase = req.diScope.resolve(
    'deletarContatoDeEmergencia',
  )

  await deletarContatoUseCase.execute(id)

  return res.status(200).send('Contato deletado com sucesso')
}
