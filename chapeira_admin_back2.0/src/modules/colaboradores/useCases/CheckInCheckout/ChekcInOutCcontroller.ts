import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class ChekcInOutController {
  async handle(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    const reqParam = z.object({
      id: z.coerce.number(),
    })

    const { id } = reqParam.parse(req.params)
    const ip = req.socket.remoteAddress
    const browser = req.headers['user-agent']

    const checkInOutUseCase = req.diScope.resolve('checkInCheckOutUsecase')

    const resposta = await checkInOutUseCase.execute(
      id,
      String(ip),
      String(browser),
    )

    return res.status(200).send(resposta)
  }
}
