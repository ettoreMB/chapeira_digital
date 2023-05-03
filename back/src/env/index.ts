import dotenv from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: './.env.development' })
} else {
  dotenv.config()
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string(),
  FRONT_URL: z.string(),
  JWT_SECRET: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('🚫 Invalid enviroment variable', _env.error.format())
  throw new Error(`Invalid enviroment variable`)
}

export const env = _env.data
