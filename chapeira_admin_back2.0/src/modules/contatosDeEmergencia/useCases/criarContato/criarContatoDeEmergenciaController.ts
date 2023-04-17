import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function criarContatoDeEmergencia(
  req: FastifyRequest,
  res: FastifyReply,
): Promise<FastifyReply> {
  const reqParamsSchema = z.object({
    lojaSigla: z.string(),
    nomeContato: z.string(),
    telefone: z.string(),
    descricao: z.string(),
  })
  const criarContatoUseCase = req.diScope.resolve('criarContatoDeEmergencia')
  const { descricao, lojaSigla, nomeContato, telefone } = reqParamsSchema.parse(
    req.body,
  )
  const { contato } = await criarContatoUseCase.execute({
    descricao,
    lojaSigla,
    nomeContato,
    telefone,
  })
  return res.status(201).send(contato)
}
