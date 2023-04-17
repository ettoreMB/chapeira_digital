import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class ListarColaboradoresController {
  async handle(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    const reqParams = z.object({
      nome: z.string(),
    })

    const reqQueryScehma = z.object({
      universoId: z.coerce.number().optional(),
      tipo: z.string().optional(),
    })
    const { nome } = reqParams.parse(req.params)
    const { universoId, tipo } = reqQueryScehma.parse(req.query)
    const listarColaboradoresUsecase = req.diScope.resolve(
      'listarColaboradoresUsecase',
    )

    const colaboradores = await listarColaboradoresUsecase.execute({
      nome,
      tipo,
      universoId,
    })

    return res.status(200).send(colaboradores)
  }
}
