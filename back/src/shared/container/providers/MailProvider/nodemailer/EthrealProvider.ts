import { IMailProvider } from '../IMailProvider'
import fs from 'node:fs'
import * as nodemailer from 'nodemailer'
import handlebars from 'handlebars'

export class EthrealMailProvider implements IMailProvider {
  private client: nodemailer.Transporter
  constructor() {}

  async enviarEmail(
    to: string,
    subject: string,
    variables: any,
    path: string,
  ): Promise<void> {
    await nodemailer
      .createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        })
        this.client = transporter
      })
      .catch((err) => console.log(err))

    const templateFileContent = fs.readFileSync(path).toString('utf-8')
    const templateParse = handlebars.compile(templateFileContent)

    const templateHtml = templateParse(variables)

    const email = await this.client.sendMail({
      from: 'Suporte@chapeira.com',
      to,
      subject,
      html: templateHtml,
    })

    console.log('Message sent: %s', email)

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(email))
  }
}
