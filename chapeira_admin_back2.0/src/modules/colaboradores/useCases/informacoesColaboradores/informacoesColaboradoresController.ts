import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class InformacoesColaboradoresController {
  async handle(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    const reqSchema = z.object({
      loja: z.string(),
    })

    const { loja } = reqSchema.parse(req.params)

    const informacoesColaboradoresUsecase = req.diScope.resolve(
      'informacoesColaboradoresUsecase',
    )

    const informacoes = await informacoesColaboradoresUsecase.execute(loja)

    return res.status(200).send(informacoes)
  }
}
