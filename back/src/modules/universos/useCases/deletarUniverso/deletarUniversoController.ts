import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class DeletarUniversoController {}

export default async function deletarUniversoHandle(
  req: FastifyRequest,
  res: FastifyReply,
): Promise<FastifyReply> {
  const reqParams = z.object({
    id: z.coerce.number(),
  })
  const { id } = reqParams.parse(req.params)

  const deletarUniversoUsecase = req.diScope.resolve('deletarUniversoUsecase')

  await deletarUniversoUsecase.execute(id)

  return res.code(200).send('universo excluido com sucesso')
}
