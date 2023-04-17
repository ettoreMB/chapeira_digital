import { buscarContatoPorId } from '@modules/contatosDeEmergencia/useCases/buscarContatoPorId/buscarContatoPorIdController'
import { criarContatoDeEmergencia } from '@modules/contatosDeEmergencia/useCases/criarContato/criarContatoDeEmergenciaController'
import { deletarContato } from '@modules/contatosDeEmergencia/useCases/deletarContato/deletarContatoController'
import { editarContatoDeEmergencia } from '@modules/contatosDeEmergencia/useCases/editarContatoDeEmergencia/editarContatosDeEmergenciaController'
import { BuscarContatosContatosController } from '@modules/contatosDeEmergencia/useCases/GetContatosPorLoja/BuscarContatosController'
import { verificarJwt } from '@shared/middlewares/verificarJwt'
import { FastifyInstance } from 'fastify'

const buscarContatosController = new BuscarContatosContatosController()
export async function contatosEmergenciaRoutes(app: FastifyInstance) {
  app.get('/:sigla', buscarContatosController.handle)
  app.get('/contato/:id', { onRequest: [verificarJwt] }, buscarContatoPorId)
  app.post('/', { onRequest: [verificarJwt] }, criarContatoDeEmergencia)
  app.delete('/:id', { onRequest: [verificarJwt] }, deletarContato)
  app.put('/', { onRequest: [verificarJwt] }, editarContatoDeEmergencia)
}
