import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class ListarUniversosPorLojaController {
  async handle(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    const reqParams = z.object({
      sigla: z.string(),
    })
    const { sigla } = reqParams.parse(req.params)

    const listarUniversosPorLojaUsecase = req.diScope.resolve(
      'listarUniversosPorLojaUsecase',
    )

    const universos = await listarUniversosPorLojaUsecase.execute(sigla)

    return res.status(200).send(universos)
  }
}
