import { FastifyReply, FastifyRequest } from 'fastify'

export class DeletarLojaController {
  async handle(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    return res.status(200).send()
  }
}
