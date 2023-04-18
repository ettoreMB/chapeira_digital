import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function cadastrarNovaSenha(
  req: FastifyRequest,
  res: FastifyReply,
): Promise<FastifyReply> {
  const reqParamsSchema = z.object({
    loja: z.string(),
  })
  const reqBodySchema = z.object({
    token: z.string(),
    senha: z.string(),
  })

  const { loja } = reqParamsSchema.parse(req.params)
  const { token, senha } = reqBodySchema.parse(req.body)
  const cadastrarNovaSenhaUsecase = req.diScope.resolve(
    'cadastrarNovaSenhaUsecase',
  )
  await cadastrarNovaSenhaUsecase.execute(token, senha, loja)

  return res.status(200).send('nova senha registrada com sucesso')
}
