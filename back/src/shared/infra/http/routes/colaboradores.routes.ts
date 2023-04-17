import { buscarColaboradorPorId } from '@modules/colaboradores/useCases/buscarPorId/buscarColaboradorPorIdController'
import { ChekcInOutController } from '@modules/colaboradores/useCases/CheckInCheckout/ChekcInOutCcontroller'
import { CriarColaboradorController } from '@modules/colaboradores/useCases/criarColaborador/criarColaboradorController'
import { DesativarColaboradorController } from '@modules/colaboradores/useCases/desativarColaborador/DesativarColaboradorController'
import { editarColaborador } from '@modules/colaboradores/useCases/editarColaborador/editarColaboradorController'
import { InformacoesColaboradoresController } from '@modules/colaboradores/useCases/informacoesColaboradores/informacoesColaboradoresController'
import { ListarColaboradoresController } from '@modules/colaboradores/useCases/listarColaboradoresPorLoja/listarColaboradoresController'
import { verificarJwt } from '@shared/middlewares/verificarJwt'
import { FastifyInstance } from 'fastify'

const listarColaboradoresController = new ListarColaboradoresController()
const chekcInOutCcontroller = new ChekcInOutController()
const criarColaboradorController = new CriarColaboradorController()
const desativarColaboradorController = new DesativarColaboradorController()

const informacoesColaboradoresController =
  new InformacoesColaboradoresController()
export async function colaboradoresRoutes(app: FastifyInstance) {
  app.patch('/adminupdate/:id', () => {})
  app.post(
    '/criar',
    { onRequest: [verificarJwt] },
    criarColaboradorController.handle,
  )
  app.get('/:nome', listarColaboradoresController.handle)

  app.get('/:sigla/dashboard', () => {})
  app.put('/checkinout/:id', chekcInOutCcontroller.handle)
  app.put(
    '/desativar/:id',
    { onRequest: [verificarJwt] },
    desativarColaboradorController.handle,
  )
  app.get('/informacoes/:loja', informacoesColaboradoresController.handle)
  app.get(
    '/colaborador/:id',
    { onRequest: [verificarJwt] },
    buscarColaboradorPorId,
  )
  app.put('/editar/:id', editarColaborador)
}
