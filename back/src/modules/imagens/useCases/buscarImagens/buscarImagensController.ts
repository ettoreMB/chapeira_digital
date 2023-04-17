import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class BuscarImagensController {
  async handle(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    const reqParams = z.object({
      loja: z.string(),
    })
    const { loja } = reqParams.parse(req.params)
    const buscarImagensUseCase = req.diScope.resolve('buscarImagensUseCase')
    const imagens = await buscarImagensUseCase.execute(loja)
    return res.status(200).send(imagens)
  }
}
