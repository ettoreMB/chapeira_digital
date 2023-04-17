import { FastifyReply, FastifyRequest } from 'fastify'

export class ListarLojasController {
  async handle(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    const listarLojasUsecase = req.diScope.resolve('listarLojasUseCase')
    const lojas = await listarLojasUsecase.execute()

    return res.status(200).send(lojas)
  }
}
