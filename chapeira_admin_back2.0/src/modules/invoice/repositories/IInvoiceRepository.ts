import { tb_Lojas_Faturamentos } from '@prisma/client'

export interface ICriarInvoiceInput {
  Loja_Sigla: string
  Nota_Fiscal: string
  Data_Faturamento: Date
  Valor_Servicos: number
  Valor_Nota: number
  Data_Vencimento: Date
  Data_Pagamento?: Date
}

export interface IInvoiceRepository {
  criar(data: ICriarInvoiceInput): Promise<tb_Lojas_Faturamentos>
}
