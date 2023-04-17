import fastify from 'fastify'
import { fastifyAwilixPlugin } from '@fastify/awilix'
import multer from 'fastify-multer'
import cors from '@fastify/cors'
import { ZodError } from 'zod'
import { contatosEmergenciaRoutes } from './routes/contatoEmergencia.routes'
import {
  diColaboradores,
  diContatosEmergencia,
  diImagens,
  diInvoices,
  diLojas,
  diUniversos,
} from '@shared/container'
import { imagensRoutes } from './routes/images.routes'
import { lojasRoutes } from './routes/lojas.routes'
import { UniversosRoutes } from './routes/universos.routes'
import { colaboradoresRoutes } from './routes/colaboradores.routes'
import { env } from 'env'
import { InvoicesRoutes } from './routes/invoices.routes'
import fastifyJwt from '@fastify/jwt'
import { authRoutes } from './routes/auth.routes'
import { AppErrors } from '@shared/errors/AppErros'
import fastifyCookie from '@fastify/cookie'

export const app = fastify()
app.register(cors, {
  origin: true,
  prefix: 'http://localhost:5000',
})
app.register(fastifyAwilixPlugin, {
  disposeOnClose: true,
  disposeOnResponse: true,
})
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'chapeira_auth',
    signed: false,
  },
  sign: {
    expiresIn: '15min',
  },
})
app.register(fastifyCookie)
app.addHook('onRequest', diContatosEmergencia)
app.addHook('onRequest', diImagens)
app.addHook('onRequest', diLojas)
app.addHook('onRequest', diUniversos)
app.addHook('onRequest', diColaboradores)
app.addHook('onRequest', diInvoices)

app.register(multer.contentParser)
app.register(contatosEmergenciaRoutes, { prefix: 'contatosEmergencia' })
app.register(imagensRoutes, { prefix: 'imagens' })
app.register(lojasRoutes, { prefix: 'lojas' })
app.register(UniversosRoutes, { prefix: 'universos' })
app.register(colaboradoresRoutes, { prefix: 'colaboradores' })
app.register(InvoicesRoutes, { prefix: 'invoices' })
app.register(authRoutes, { prefix: 'auth' })

app.setErrorHandler((error: any, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(408)
      .send({ message: 'Validation erorr.', issue: error.format() })
  }
  if (env.NODE_ENV === 'production') {
    // logger
  } else {
    console.log(error)
  }
  if (error instanceof AppErrors) {
    return reply.status(error.statusCode).send(error)
  }
  return reply.status(500).send(error)
})
