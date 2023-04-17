import { authenticate } from '@modules/colaboradores/useCases/auth/authController'
import { FastifyInstance } from 'fastify'

export async function authRoutes(app: FastifyInstance) {
  app.post('/', authenticate)
}
