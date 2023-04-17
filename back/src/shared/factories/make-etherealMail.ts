import { ColaboradoresRepository } from '@modules/colaboradores/infra/prisma/colaboradoresRepository'
import { EnviarEmailPerdaSenhaUsecase } from '@modules/colaboradores/useCases/enviarEmailPerdaSenha/enviarEmailPerdaSenhaUsecase'
import { LojaRepository } from '@modules/lojas/infra/prisma/lojaRepository'
import { EthrealMailProvider } from '@shared/container/providers/MailProvider/nodemailer/EthrealProvider'

export function makeEtherealMailUsecase() {
  const colaboradoresRepository = new ColaboradoresRepository()
  const mailProvider = new EthrealMailProvider()
  const lojaRepository = new LojaRepository()
  const enviarEmailPerdaSenhaUsecase = new EnviarEmailPerdaSenhaUsecase(
    colaboradoresRepository,
    lojaRepository,
    mailProvider,
  )

  return enviarEmailPerdaSenhaUsecase
}
