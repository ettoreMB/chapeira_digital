import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class EditarUniversoController {
  async handle(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    const reqBody = z.object({
      id: z.number(),
      universo: z.string(),
      zona: z.string(),
      andar: z.string(),
    })
    const { id, universo, zona, andar } = reqBody.parse(req.body)

    const editarUniversoUseCase = req.diScope.resolve('editarUniversoUsecase')

    await editarUniversoUseCase.execute({
      id,
      Universo: universo,
      Zona: zona,
      Andar: andar,
    })
    return res.status(200).send(`Universo alterado com sucesso`)
  }
}
