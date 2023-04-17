import { app } from './app'
import { env } from '../../../env'

async function startServer() {
  try {
    await app.listen({ port: env.PORT, host: '0.0.0.0' })
    console.log(`Server is running on ${env.PORT}`)
  } catch (error) {
    app.log.error(error)
  }
}

startServer()
