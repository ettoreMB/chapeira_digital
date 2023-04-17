import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class DesativarColaboradorController {
  async handle(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    const reqParamsSchema = z.object({
      id: z.coerce.number(),
    })

    const { id } = reqParamsSchema.parse(req.params)

    const desativarColaboradorUsecase = req.diScope.resolve(
      'desativarColaboradorUsecase',
    )

    await desativarColaboradorUsecase.execute(id)

    return res.status(200).send('Colabodar desativado com sucesso')
  }
}
