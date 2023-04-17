import { FastifyReply, FastifyRequest } from 'fastify'

export async function ImportarInvoices(
  req: FastifyRequest,
  res: FastifyReply,
): Promise<FastifyReply> {
  const { file }: any = req

  const importarInvoiceUsecase = req.diScope.resolve('importarInvoicesUseCase')

  await importarInvoiceUsecase.execute(file)
  return res.status(200).send()
}
