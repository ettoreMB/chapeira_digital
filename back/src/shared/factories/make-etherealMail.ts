import { ColaboradoresRepository } from '@modules/colaboradores/infra/prisma/colaboradoresRepository'
import { EnviarEmailPerdaSenhaUsecase } from '@modules/colaboradores/useCases/enviarEmailPerdaSenha/enviarEmailPerdaSenhaUsecase'
import { LojaRepository } from '@modules/lojas/infra/prisma/lojaRepository'

import { OficeMailProvider } from '@shared/container/providers/MailProvider/nodemailer/OfficeMailer'

export function makeMailUsecase() {
  const colaboradoresRepository = new ColaboradoresRepository()
  const mailProvider = new OficeMailProvider()
  const lojaRepository = new LojaRepository()
  const enviarEmailPerdaSenhaUsecase = new EnviarEmailPerdaSenhaUsecase(
    colaboradoresRepository,
    lojaRepository,
    mailProvider,
  )

  return enviarEmailPerdaSenhaUsecase
}
