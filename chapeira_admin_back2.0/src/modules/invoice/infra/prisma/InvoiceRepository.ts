import {
  ICriarInvoiceInput,
  IInvoiceRepository,
} from '@modules/invoice/repositories/IInvoiceRepository'
import { tb_Lojas_Faturamentos } from '@prisma/client'
import { prisma } from 'db/prisma'

export class InvoiceRepository implements IInvoiceRepository {
  async criar(data: ICriarInvoiceInput): Promise<tb_Lojas_Faturamentos> {
    const invoice = await prisma.tb_Lojas_Faturamentos.create({
      data: {
        Nota_Fiscal: data.Nota_Fiscal,
        Data_Faturamento: data.Data_Faturamento,
        Insert_Date: new Date(),
        Loja_Sigla: data.Loja_Sigla,
        Pendente: true,
        Valor_Servicos: data.Valor_Servicos,
        Valor_Nota: data.Valor_Nota,
      },
    })

    return invoice
  }
}
