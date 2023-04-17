import { AppErrors } from '@shared/errors/AppErros'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class CriarUniversoController {
  async handle(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    const reqBody = z.object({
      lojaSigla: z.string(),
      universo: z.string(),
      zona: z.string().default('0'),
      andar: z.string().default('0'),
    })
    const data = reqBody.parse(req.body)

    try {
      const criarUniversoUseCase = req.diScope.resolve('criarUniversoUsecase')

      await criarUniversoUseCase.execute({
        Universo: data.universo,
        Andar: data.andar,
        Loja_Sigla: data.lojaSigla,
        Zona: data.zona,
      })
    } catch (error) {
      if (error instanceof AppErrors) {
        return res.status(409).send({ message: error.message })
      }
      throw error
    }

    return res.status(200).send('Universo crido com sucesso')
  }
}
