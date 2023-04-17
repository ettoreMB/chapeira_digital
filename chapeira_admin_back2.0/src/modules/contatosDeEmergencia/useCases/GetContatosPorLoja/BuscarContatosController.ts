import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

export class BuscarContatosContatosController {
  async handle(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    const reqParams = z.object({
      sigla: z.string(),
    })
    const { sigla } = reqParams.parse(req.params)

    const buscarContatosUseCase = req.diScope.resolve('buscarContatosUsecase')

    const contatos = await buscarContatosUseCase.execute(sigla)

    return res.status(200).send(contatos)
  }
}
