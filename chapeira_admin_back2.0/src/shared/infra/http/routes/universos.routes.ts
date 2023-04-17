import { buscarUniversoPorId } from '@modules/universos/useCases/buscarUniversoPorId/buscarUniversoPorIdController'
import { CriarUniversoController } from '@modules/universos/useCases/criarUniverso/criarUniversoController'
import deletarUniversoHandle from '@modules/universos/useCases/deletarUniverso/deletarUniversoController'
import { EditarUniversoController } from '@modules/universos/useCases/editarUniverso/editarUniversoController'
import { ListarUniversosPorLojaController } from '@modules/universos/useCases/listarUniversosPorLoja/listarUniversosPorLojaController'
import { verificarJwt } from '@shared/middlewares/verificarJwt'
import { FastifyInstance } from 'fastify'

const listarUniversosPorLojaController = new ListarUniversosPorLojaController()
const criarUniversoController = new CriarUniversoController()
const editarUniversoController = new EditarUniversoController()

export async function UniversosRoutes(app: FastifyInstance) {
  app.post('/', { onRequest: [verificarJwt] }, criarUniversoController.handle)
  app.get('/:sigla', listarUniversosPorLojaController.handle)
  app.put(
    '/editar',
    { onRequest: [verificarJwt] },
    editarUniversoController.handle,
  )
  app.delete('/:id', { onRequest: [verificarJwt] }, deletarUniversoHandle)
  app.get('/universo/:id', buscarUniversoPorId)
}
