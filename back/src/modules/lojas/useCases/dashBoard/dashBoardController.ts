import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function dashBoardController(
  req: FastifyRequest,
  res: FastifyReply,
): Promise<FastifyReply> {
  const ReqParamsSchema = z.object({
    nome: z.string(),
  })

  const { nome } = ReqParamsSchema.parse(req.params)

  const dashBoardUsecase = req.diScope.resolve('dashBoardUsecase')

  const { dados } = await dashBoardUsecase.execute(nome)

  return res.status(200).send(dados)
}
