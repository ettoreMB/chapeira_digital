import { BuscarImagensController } from '@modules/imagens/useCases/buscarImagens/buscarImagensController'
import { FastifyInstance } from 'fastify'

const buscarImagensController = new BuscarImagensController()

export async function imagensRoutes(app: FastifyInstance) {
  app.get('/:loja', buscarImagensController.handle)
}
