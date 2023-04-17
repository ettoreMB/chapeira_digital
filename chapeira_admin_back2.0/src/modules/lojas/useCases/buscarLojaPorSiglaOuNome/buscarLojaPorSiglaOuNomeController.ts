import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class BuscarLojaPorSiglaOuNomeController {
  async handle(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    const reqParams = z.object({
      sigla: z.string(),
    })
    const { sigla } = reqParams.parse(req.params)
    const buscarLojasPorSiglaOuNomeUsecase = req.diScope.resolve(
      'buscarLojaPorSiglaOuNome',
    )

    const loja = await buscarLojasPorSiglaOuNomeUsecase.execute(sigla)

    return res.status(200).send(loja)
  }
}
