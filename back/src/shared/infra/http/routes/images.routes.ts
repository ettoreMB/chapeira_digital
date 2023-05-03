import { BuscarImagensController } from '@modules/imagens/useCases/buscarImagens/buscarImagensController'
import { salvarImagem } from '@modules/imagens/useCases/salvarImagem/salvarImagemController'
import { multer } from '@shared/middlewares/multer'

import { FastifyInstance } from 'fastify'

const buscarImagensController = new BuscarImagensController()

export async function imagensRoutes(app: FastifyInstance) {
  app.get('/:loja', buscarImagensController.handle)
  app.post(
    '/salvar/:loja',
    { preHandler: multer.single('imagem') },

    salvarImagem,
  )
}
