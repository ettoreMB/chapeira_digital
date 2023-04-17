import {
  ICriarInvoiceInput,
  IInvoiceRepository,
} from '@modules/invoice/repositories/IInvoiceRepository'
import { File } from 'fastify-multer/lib/interfaces'
import { createReadStream, promises } from 'fs'
import { parse } from 'csv-parse'

export class ImportarInvoiceUseCase {
  constructor(private invoiceRepository: IInvoiceRepository) {}

  carregarArquivo(arquivo: File | any): Promise<ICriarInvoiceInput[]> {
    return new Promise((resolve, reject) => {
      const stream = createReadStream(arquivo.path)
      const invoices: ICriarInvoiceInput[] = []

      stream
        .pipe(parse({ delimiter: ',' }))
        .on('data', async (linha) => {
          const [
            Loja_Sigla,
            Nota_Fiscal,
            Valor_Servicos,
            Valor_Nota,
            Data_Faturamento,
            Data_Vencimento,
          ] = linha

          invoices.push({
            Loja_Sigla,
            Nota_Fiscal,
            Valor_Servicos,
            Valor_Nota,
            Data_Faturamento: new Date(Data_Faturamento),
            Data_Vencimento: new Date(Data_Vencimento),
          })
        })
        .on('end', () => {
          promises.unlink(arquivo.path)
          resolve(invoices)
        })
        .on('error', (err) => {
          reject(err)
        })
    })
  }

  async execute(arquivo: File): Promise<void> {
    const invoices = await this.carregarArquivo(arquivo)
    invoices.map(async (invoice) => {
      const {
        Loja_Sigla,
        Nota_Fiscal,
        Valor_Servicos,
        Valor_Nota,
        Data_Faturamento,
        Data_Vencimento,
      } = invoice

      await this.invoiceRepository.criar({
        Loja_Sigla,
        Data_Faturamento,
        Data_Vencimento,
        Nota_Fiscal,
        Valor_Nota,
        Valor_Servicos,
      })
    })
  }
}
