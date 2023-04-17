import { ImportarInvoices } from '@modules/invoice/useCases/importarInvoice/importarInvoiceController'
import { FastifyInstance } from 'fastify'

import multer from 'fastify-multer'
const upload = multer({ dest: '/uploads' })

export async function InvoicesRoutes(app: FastifyInstance) {
  app.get('/', () => {})
  app.get('/:loja', () => {})
  app.delete('/:nota', () => {})
  app.patch('/:nota', () => {})
  app.post('/importar', { preHandler: upload.single('file') }, ImportarInvoices)
}
