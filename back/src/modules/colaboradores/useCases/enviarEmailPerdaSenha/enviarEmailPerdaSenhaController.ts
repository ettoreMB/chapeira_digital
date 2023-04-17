import { makeEtherealMailUsecase } from '@shared/factories/make-etherealMail'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function enviarEmailPerdaSenha(
  req: FastifyRequest,
  res: FastifyReply,
): Promise<FastifyReply> {
  const reqBodySchema = z.object({
    email: z.string(),
    loja: z.string(),
  })

  const { email, loja } = reqBodySchema.parse(req.body)

  const enviarEmailPerdaSenhaUsecase = makeEtherealMailUsecase()

  const token = await res.jwtSign({}, { sign: { sub: email! } })
  await enviarEmailPerdaSenhaUsecase.execute(email, loja, token)
  return res.status(200).send('Email enviado com sucesso')
}
