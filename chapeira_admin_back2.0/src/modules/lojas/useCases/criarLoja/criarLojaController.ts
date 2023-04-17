import { AppErrors } from '@shared/errors/AppErros'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class CriarLojaController {
  async handle(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    const reqBodySchema = z.object({
      Loja_Sigla: z.string(),
      Loja: z.string(),
      Loja_Endereco: z.string(),
      Loja_Cidade: z.string(),
      Loja_UF: z.string(),
      Loja_Telefone: z.string().nullable(),
      Responsavel: z.string(),
      Responsavel_Email: z.string().email(),
      Responsavel_Telefone: z.string(),
      CNPJ: z.coerce.number(),
    })

    const data = reqBodySchema.parse(req.body)

    const criarLojaUseCase = req.diScope.resolve('criarLojaUseCase')

    try {
      await criarLojaUseCase.execute(data)
    } catch (error) {
      if (error instanceof AppErrors) {
        return res.status(409).send({ message: error.message })
      }
      throw error
    }
    return res.status(200).send()
  }
}
