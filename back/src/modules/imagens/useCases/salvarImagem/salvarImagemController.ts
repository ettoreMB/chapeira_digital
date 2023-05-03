import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function salvarImagem(
  req: FastifyRequest,
  res: FastifyReply,
): Promise<FastifyReply> {
  const reqParamsSchema = z.object({
    loja: z.string(),
  })

  const reqBodySchema = z.object({
    titulo: z.string(),
  })
  const fileBodySchema = z.object({
    file: z.object({
      fieldname: z.string(),
      originalname: z.string(),
      encoding: z.string(),
      mimetype: z.string(),
      destination: z.string(),
      filename: z.string(),
      path: z.string(),
      size: z.number(),
    }),
  })
  const { file } = fileBodySchema.parse(req)
  const { titulo } = reqBodySchema.parse(req.body)
  const { loja } = reqParamsSchema.parse(req.params)

  const salvarImagemUsecase = req.diScope.resolve('salvarImagensUseCase')

  await salvarImagemUsecase.execute(loja, titulo, file)
  return res.send({ file, titulo, loja })
}
