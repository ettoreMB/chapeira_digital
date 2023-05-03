/* eslint-disable no-unused-vars */
import { CidadeRepository } from '@modules/cidades/infra/prisma/repository/cidadesRepository'
import { ColaboradoresRepository } from '@modules/colaboradores/infra/prisma/colaboradoresRepository'
import { AuthUsecase } from '@modules/colaboradores/useCases/auth/authUseCase'

import { BuscarColaboradorPorIdUseCase } from '@modules/colaboradores/useCases/buscarPorId/buscarColaboradorPorIdUseCase'
import { CadastrarNovaSenhaUseCase } from '@modules/colaboradores/useCases/cadastrarNovaSenha/cadastrarNovaSenhaUseCase'
import { CheckInOutUsecase } from '@modules/colaboradores/useCases/CheckInCheckout/CheckInOutUsecase'
import { CriarColaboradorController } from '@modules/colaboradores/useCases/criarColaborador/criarColaboradorController'
import { CriarColaboradorUsecase } from '@modules/colaboradores/useCases/criarColaborador/criarColaboradorUsecase'
import { DesativarColaboradorUsecase } from '@modules/colaboradores/useCases/desativarColaborador/DesativarColaboradorUsecase'
import { EditarColaboradorUseCase } from '@modules/colaboradores/useCases/editarColaborador/editarColaboradorUseCase'
import { EnviarEmailPerdaSenhaUsecase } from '@modules/colaboradores/useCases/enviarEmailPerdaSenha/enviarEmailPerdaSenhaUsecase'
import { InformacoesColaboradoresUsecase } from '@modules/colaboradores/useCases/informacoesColaboradores/informacoesColaboradoresUseCase'
import { ListarColaboradoresUseCase } from '@modules/colaboradores/useCases/listarColaboradoresPorLoja/listarColaboradoresUseCase'
import { ContatosEmergenciaRepository } from '@modules/contatosDeEmergencia/infra/prisma/EmergenciContactsRepository'
import { BuscarContatoPorIdUseCase } from '@modules/contatosDeEmergencia/useCases/buscarContatoPorId/buscarContatoPorIdUseCase'
import { CriarContatoDeEmergenciaUsecase } from '@modules/contatosDeEmergencia/useCases/criarContato/criarContatoDeEmergenciaUsecase'
import { DeletarContatoUseCase } from '@modules/contatosDeEmergencia/useCases/deletarContato/deletarContatoUsecase'
import { EditarContatoDeEmergenciaUsecase } from '@modules/contatosDeEmergencia/useCases/editarContatoDeEmergencia/editarContatoDeEmergenciaUsecase'
import { BuscarContatosContatosUseCase } from '@modules/contatosDeEmergencia/useCases/GetContatosPorLoja/BuscarContatosUseCase'
import { ImagensRepository } from '@modules/imagens/infra/prisma/repositories/ImagenRepository'
import { BuscarImagensUseCase } from '@modules/imagens/useCases/buscarImagens/buscarImagensUseCase'
import { SalvarImagemUsecase } from '@modules/imagens/useCases/salvarImagem/salvarImagemUsecase'
import { InvoiceRepository } from '@modules/invoice/infra/prisma/InvoiceRepository'
import { IInvoiceRepository } from '@modules/invoice/repositories/IInvoiceRepository'
import { ImportarInvoiceUseCase } from '@modules/invoice/useCases/importarInvoice/importarInvoiceUsecase'
import { LojaRepository } from '@modules/lojas/infra/prisma/lojaRepository'
import { BuscarLojaPorSiglaOuNomeUsecase } from '@modules/lojas/useCases/buscarLojaPorSiglaOuNome/buscarLojaPorSiglaOuNomeUsecase'
import { CriarLojaUsecase } from '@modules/lojas/useCases/criarLoja/criarLojaUsecase'
import { DashBoardUsecase } from '@modules/lojas/useCases/dashBoard/dashBoardUseCase'
import { EditarLojaUsecase } from '@modules/lojas/useCases/editarLoja/editarLojaUsecase'
import { ListarLojasUsecase } from '@modules/lojas/useCases/listarLojas/listarLojasUsecase'
import { UniversoRepository } from '@modules/universos/infra/prisma/universoRepository'
import { BuscarUniversoPorIdUSecase } from '@modules/universos/useCases/buscarUniversoPorId/buscarUniversoPorIdUsecase'
import { CriarUniversoUsecase } from '@modules/universos/useCases/criarUniverso/criarUniversoUsecase'
import { DeletarUniversoUsecase } from '@modules/universos/useCases/deletarUniverso/deletarUniversoUsecase'
import { EditarUniversoUsecase } from '@modules/universos/useCases/editarUniverso/editarUniversoUsecase'
import { ListarUniversosPorLojaUsecase } from '@modules/universos/useCases/listarUniversosPorLoja/listarUniversosPorLojaUsecase'
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider'
import { EthrealMailProvider } from '@shared/container/providers/MailProvider/nodemailer/EthrealProvider'

declare module '@fastify/awilix' {
  interface Cradle {
    contatosEmergenciaRepository: ContatosEmergenciaRepository
    buscarContatosUsecase: BuscarContatosContatosUseCase
    imagensRepository: ImagensRepository
    lojasRepository: LojaRepository
    buscarImagensUseCase: BuscarImagensUseCase
    listarLojasUseCase: ListarLojasUsecase
    buscarLojaPorSiglaOuNome: BuscarLojaPorSiglaOuNomeUsecase
    criarLojaUseCase: CriarLojaUsecase
    dashBoardUsecase: DashBoardUsecase
    buscarLojaPorNomeUsecase: BuscarLojaPorSiglaOuNomeUsecase
    universosRepository: UniversoRepository
    editarUniversoUsecase: EditarUniversoUsecase
    criarUniversoUsecase: CriarUniversoUsecase
    listarUniversosPorLojaUsecase: ListarUniversosPorLojaUsecase
    deletarUniversoUsecase: DeletarUniversoUsecase
    colaboradoresRepository: ColaboradoresRepository
    listarColaboradoresUsecase: ListarColaboradoresUseCase
    checkInCheckOutUsecase: CheckInOutUsecase
    criarColaboradorUsecase: CriarColaboradorUsecase
    desativarColaboradorUsecase: DesativarColaboradorUsecase
    informacoesColaboradoresUsecase: InformacoesColaboradoresUsecase
    cidadesRepository: CidadeRepository
    buscarColaboradorPorIdUseCase: BuscarColaboradorPorIdUseCase
    buscarContatoPorId: BuscarContatoPorIdUseCase
    buscarUniversoPorIdUSecase: BuscarUniversoPorIdUSecase
    criarContatoDeEmergencia: CriarContatoDeEmergenciaUsecase
    invoicesRepository: IInvoiceRepository
    importarInvoicesUseCase: ImportarInvoiceUseCase
    editarLojaUsecase: EditarLojaUsecase
    deletarContatoDeEmergencia: DeletarContatoUseCase
    editarContatoDeEmergencia: EditarContatoDeEmergenciaUsecase
    authUsecase: AuthUsecase
    editarColaboradorUsecase: EditarColaboradorUseCase
    ethrealMailProvider: EthrealMailProvider
    enviarEmailPerdaSenhaUsecase: EnviarEmailPerdaSenhaUsecase
    cadastrarNovaSenhaUsecase: CadastrarNovaSenhaUseCase
    salvarImagensUseCase: SalvarImagemUsecase
  }
  interface RequestCradle {
    contatosEmergenciaRepository: ContatosEmergenciaRepository
    imagensRepository: ImagensRepository
    lojasRepository: LojaRepository
    universosRepository: UniversoRepository
    colaboradoresRepository: ColaboradoresRepository
    cidadesRepository: CidadeRepository
    invoicesReposiotry: InvoiceRepository
    ethrealMailProvider: EthrealMailProvider
  }
}
