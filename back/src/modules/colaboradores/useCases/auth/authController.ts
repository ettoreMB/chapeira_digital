import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    senha: z.string(),
  })
  const { email, senha } = authenticateBodySchema.parse(req.body)
  const adminUsecase = req.diScope.resolve('authUsecase')
  const admin = await adminUsecase.execute(email, senha)
  const token = await res.jwtSign({}, { sign: { sub: admin.Email! } })

  return res
    .setCookie('token', token)
    .status(200)
    .send({ token, nome: admin.Nome })
}
