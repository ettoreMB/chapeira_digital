import { BuscarLojaPorSiglaOuNomeController } from '@modules/lojas/useCases/buscarLojaPorSiglaOuNome/buscarLojaPorSiglaOuNomeController'
import { CriarLojaController } from '@modules/lojas/useCases/criarLoja/criarLojaController'
import { dashBoardController } from '@modules/lojas/useCases/dashBoard/dashBoardController'
import { editarLoja } from '@modules/lojas/useCases/editarLoja/editarLojaController'

import { ListarLojasController } from '@modules/lojas/useCases/listarLojas/listarLojasController'
import { verificarJwt } from '@shared/middlewares/verificarJwt'
import { FastifyInstance } from 'fastify'

const listarLojasController = new ListarLojasController()
const buscarLojaPorSiglaOuNome = new BuscarLojaPorSiglaOuNomeController()

const criarLojaController = new CriarLojaController()

export async function lojasRoutes(app: FastifyInstance) {
  app.post('/criar', criarLojaController.handle)
  app.get('/listar', listarLojasController.handle)
  app.get('/dashBoard/:nome', dashBoardController)
  app.get('/sigla/:sigla', buscarLojaPorSiglaOuNome.handle)
  app.put('/editar/:id', { onRequest: [verificarJwt] }, editarLoja)
}
