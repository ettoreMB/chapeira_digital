import { FastifyRequest, FastifyReply } from 'fastify'

export async function verificarJwt(req: FastifyRequest, res: FastifyReply) {
  try {
    await req.jwtVerify()
  } catch (error) {
    return res.status(401).send({ message: 'Não autorizado.' })
  }
}

export async function DecodeJwt(req: FastifyRequest, res: FastifyReply) {
  await req.jwtDecode()
}
