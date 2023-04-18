import { IMailProvider } from '../IMailProvider'
import fs from 'node:fs'
import * as nodemailer from 'nodemailer'
import handlebars from 'handlebars'

export class OficeMailProvider implements IMailProvider {
  private client: nodemailer.Transporter
  constructor() {
    const transporter = nodemailer.createTransport({
      host: 'smtp-mail.outlook.com',
      port: 587,
      auth: {
        user: 'suporte@chapeira.com.br',
        pass: '@Mepm2412',
      },
    })
    this.client = transporter
  }

  async enviarEmail(
    to: string,
    subject: string,
    variables: any,
    path: string,
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8')
    const templateParse = handlebars.compile(templateFileContent)

    const templateHtml = templateParse(variables)

    const email = await this.client.sendMail({
      from: 'suporte@chapeira.com.br',
      to,
      subject,
      html: templateHtml,
    })

    console.log('Message sent: %s', email)

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(email))
  }
}
