import { diContainer } from '@fastify/awilix'
import { FastifyRequest, FastifyReply, DoneFuncWithErrOrRes } from 'fastify'
import { Lifetime, asFunction, asClass } from 'awilix'
import { ContatosEmergenciaRepository } from '@modules/contatosDeEmergencia/infra/prisma/EmergenciContactsRepository'
import { BuscarContatosContatosUseCase } from '@modules/contatosDeEmergencia/useCases/GetContatosPorLoja/BuscarContatosUseCase'
import { ImagensRepository } from '@modules/imagens/infra/prisma/repositories/ImagenRepository'
import { BuscarImagensUseCase } from '@modules/imagens/useCases/buscarImagens/buscarImagensUseCase'
import { LojaRepository } from '@modules/lojas/infra/prisma/lojaRepository'
import { ListarLojasUsecase } from '@modules/lojas/useCases/listarLojas/listarLojasUsecase'
import { BuscarLojaPorSiglaOuNomeUsecase } from '@modules/lojas/useCases/buscarLojaPorSiglaOuNome/buscarLojaPorSiglaOuNomeUsecase'
import { UniversoRepository } from '@modules/universos/infra/prisma/universoRepository'
import { ListarUniversosPorLojaUsecase } from '@modules/universos/useCases/listarUniversosPorLoja/listarUniversosPorLojaUsecase'
import { CriarUniversoUsecase } from '@modules/universos/useCases/criarUniverso/criarUniversoUsecase'
import { EditarUniversoUsecase } from '@modules/universos/useCases/editarUniverso/editarUniversoUsecase'
import { DeletarUniversoUsecase } from '@modules/universos/useCases/deletarUniverso/deletarUniversoUsecase'
import { ColaboradoresRepository } from '@modules/colaboradores/infra/prisma/colaboradoresRepository'
import { ListarColaboradoresUseCase } from '@modules/colaboradores/useCases/listarColaboradoresPorLoja/listarColaboradoresUseCase'
import { CheckInOutUsecase } from '@modules/colaboradores/useCases/CheckInCheckout/CheckInOutUsecase'
import { CriarColaboradorUsecase } from '@modules/colaboradores/useCases/criarColaborador/criarColaboradorUsecase'
import { DesativarColaboradorUsecase } from '@modules/colaboradores/useCases/desativarColaborador/DesativarColaboradorUsecase'
import { InformacoesColaboradoresUsecase } from '@modules/colaboradores/useCases/informacoesColaboradores/informacoesColaboradoresUseCase'
import { CidadeRepository } from '@modules/cidades/infra/prisma/repository/cidadesRepository'
import { CriarLojaUsecase } from '@modules/lojas/useCases/criarLoja/criarLojaUsecase'
import { DashBoardUsecase } from '@modules/lojas/useCases/dashBoard/dashBoardUseCase'
import { BuscarColaboradorPorIdUseCase } from '@modules/colaboradores/useCases/buscarPorId/buscarColaboradorPorIdUseCase'
import { BuscarContatoPorIdUseCase } from '@modules/contatosDeEmergencia/useCases/buscarContatoPorId/buscarContatoPorIdUseCase'
import { BuscarUniversoPorIdUSecase } from '@modules/universos/useCases/buscarUniversoPorId/buscarUniversoPorIdUsecase'
import { CriarContatoDeEmergenciaUsecase } from '@modules/contatosDeEmergencia/useCases/criarContato/criarContatoDeEmergenciaUsecase'
import { InvoiceRepository } from '@modules/invoice/infra/prisma/InvoiceRepository'
import { ImportarInvoiceUseCase } from '@modules/invoice/useCases/importarInvoice/importarInvoiceUsecase'
import { EditarLojaUsecase } from '@modules/lojas/useCases/editarLoja/editarLojaUsecase'
import { DeletarContatoUseCase } from '@modules/contatosDeEmergencia/useCases/deletarContato/deletarContatoUsecase'
import { EditarContatoDeEmergenciaUsecase } from '@modules/contatosDeEmergencia/useCases/editarContatoDeEmergencia/editarContatoDeEmergenciaUsecase'
import { AuthUsecase } from '@modules/colaboradores/useCases/auth/authUseCase'
import { EditarColaboradorUseCase } from '@modules/colaboradores/useCases/editarColaborador/editarColaboradorUseCase'
import { EthrealMailProvider } from './providers/MailProvider/nodemailer/EthrealProvider'
import { EnviarEmailPerdaSenhaUsecase } from '@modules/colaboradores/useCases/enviarEmailPerdaSenha/enviarEmailPerdaSenhaUsecase'

diContainer.register({
  contatosEmergenciaRepository: asClass(ContatosEmergenciaRepository, {
    lifetime: Lifetime.SINGLETON,
    dispose: (module: any) => module.dispose(),
  }),
})

diContainer.register({
  ethrealMailProvider: asClass(EthrealMailProvider, {
    lifetime: Lifetime.SINGLETON,
    dispose: (module: any) => module.dispose(),
  }),
})

diContainer.register({
  imagensRepository: asClass(ImagensRepository, {
    lifetime: Lifetime.SINGLETON,
    dispose: (module: any) => module.dispose(),
  }),
})

diContainer.register({
  lojasRepository: asClass(LojaRepository, {
    lifetime: Lifetime.SINGLETON,
    dispose: (module: any) => module.dispose(),
  }),
})

diContainer.register({
  universosRepository: asClass(UniversoRepository, {
    lifetime: Lifetime.SINGLETON,
    dispose: (module: any) => module.dispose(),
  }),
})

diContainer.register({
  cidadesRepository: asClass(CidadeRepository, {
    lifetime: Lifetime.SINGLETON,
    dispose: (module: any) => module.dispose(),
  }),
})

diContainer.register({
  colaboradoresRepository: asClass(ColaboradoresRepository, {
    lifetime: Lifetime.SINGLETON,
    dispose: (module: any) => module.dispose(),
  }),
})
diContainer.register({
  invoicesRepository: asClass(InvoiceRepository, {
    lifetime: Lifetime.SINGLETON,
    dispose: (module: any) => module.dispose(),
  }),
})

export function diContatosEmergencia(
  request: FastifyRequest,
  reply: FastifyReply,
  done: DoneFuncWithErrOrRes,
) {
  request.diScope.register({
    buscarContatosUsecase: asFunction(
      ({ contatosEmergenciaRepository }: any) => {
        return new BuscarContatosContatosUseCase(contatosEmergenciaRepository)
      },
      {
        lifetime: Lifetime.SCOPED,
        dispose: (module: any) => module.dispose(),
      },
    ),
  })
  request.diScope.register({
    buscarContatoPorId: asFunction(
      ({ contatosEmergenciaRepository }: any) => {
        return new BuscarContatoPorIdUseCase(contatosEmergenciaRepository)
      },
      {
        lifetime: Lifetime.SCOPED,
        dispose: (module: any) => module.dispose(),
      },
    ),
  })
  request.diScope.register({
    criarContatoDeEmergencia: asFunction(
      ({ contatosEmergenciaRepository }: any) => {
        return new CriarContatoDeEmergenciaUsecase(contatosEmergenciaRepository)
      },
      {
        lifetime: Lifetime.SCOPED,
        dispose: (module: any) => module.dispose(),
      },
    ),
  })
  request.diScope.register({
    deletarContatoDeEmergencia: asFunction(
      ({ contatosEmergenciaRepository }: any) => {
        return new DeletarContatoUseCase(contatosEmergenciaRepository)
      },
      {
        lifetime: Lifetime.SCOPED,
        dispose: (module: any) => module.dispose(),
      },
    ),
  })
  request.diScope.register({
    editarContatoDeEmergencia: asFunction(
      ({ contatosEmergenciaRepository }: any) => {
        return new EditarContatoDeEmergenciaUsecase(
          contatosEmergenciaRepository,
        )
      },
      {
        lifetime: Lifetime.SCOPED,
        dispose: (module: any) => module.dispose(),
      },
    ),
  })
  done()
}

export function diImagens(
  request: FastifyRequest,
  reply: FastifyReply,
  done: DoneFuncWithErrOrRes,
) {
  request.diScope.register({
    buscarImagensUseCase: asFunction(
      ({ imagensRepository }: any) => {
        return new BuscarImagensUseCase(imagensRepository)
      },
      {
        lifetime: Lifetime.SCOPED,
        dispose: (module: any) => module.dispose(),
      },
    ),
  })
  done()
}

export function diLojas(
  request: FastifyRequest,
  reply: FastifyReply,
  done: DoneFuncWithErrOrRes,
) {
  request.diScope.register({
    criarLojaUseCase: asFunction(
      ({
        lojasRepository,
        cidadesRepository,
        colaboradoresRepository,
        universosRepository,
      }: any) => {
        return new CriarLojaUsecase(
          lojasRepository,
          cidadesRepository,
          colaboradoresRepository,
          universosRepository,
        )
      },
      {
        lifetime: Lifetime.SCOPED,
        dispose: (module: any) => module.dispose(),
      },
    ),
  })
  request.diScope.register({
    listarLojasUseCase: asFunction(
      ({ lojasRepository }: any) => {
        return new ListarLojasUsecase(lojasRepository)
      },
      {
        lifetime: Lifetime.SCOPED,
        dispose: (module: any) => module.dispose(),
      },
    ),
  })
  request.diScope.register({
    buscarLojaPorSiglaOuNome: asFunction(
      ({ lojasRepository }: any) => {
        return new BuscarLojaPorSiglaOuNomeUsecase(lojasRepository)
      },
      {
        lifetime: Lifetime.SCOPED,
        dispose: (module: any) => module.dispose(),
      },
    ),
  })
  request.diScope.register({
    buscarLojaPorNomeUsecase: asFunction(
      ({ lojasRepository }: any) => {
        return new BuscarLojaPorSiglaOuNomeUsecase(lojasRepository)
      },
      {
        lifetime: Lifetime.SCOPED,
        dispose: (module: any) => module.dispose(),
      },
    ),
  })
  request.diScope.register({
    dashBoardUsecase: asFunction(
      ({ lojasRepository }: any) => {
        return new DashBoardUsecase(lojasRepository)
      },
      {
        lifetime: Lifetime.SCOPED,
        dispose: (module: any) => module.dispose(),
      },
    ),
  })
  request.diScope.register({
    editarLojaUsecase: asFunction(
      ({ lojasRepository }: any) => {
        return new EditarLojaUsecase(lojasRepository)
      },
      {
        lifetime: Lifetime.SCOPED,
        dispose: (module: any) => module.dispose(),
      },
    ),
  })
  done()
}

export function diUniversos(
  request: FastifyRequest,
  reply: FastifyReply,
  done: DoneFuncWithErrOrRes,
) {
  request.diScope.register({
    listarUniversosPorLojaUsecase: asFunction(
      ({ lojasRepository, universosRepository }: any) => {
        return new ListarUniversosPorLojaUsecase(
          universosRepository,
          lojasRepository,
        )
      },
      {
        lifetime: Lifetime.SCOPED,
        dispose: (module: any) => module.dispose(),
      },
    ),
  })
  request.diScope.register({
    criarUniversoUsecase: asFunction(
      ({ universosRepository }: any) => {
        return new CriarUniversoUsecase(universosRepository)
      },
      {
        lifetime: Lifetime.SCOPED,
        dispose: (module: any) => module.dispose(),
      },
    ),
  })
  request.diScope.register({
    editarUniversoUsecase: asFunction(
      ({ universosRepository }: any) => {
        return new EditarUniversoUsecase(universosRepository)
      },
      {
        lifetime: Lifetime.SCOPED,
        dispose: (module: any) => module.dispose(),
      },
    ),
  })
  request.diScope.register({
    deletarUniversoUsecase: asFunction(
      ({ universosRepository, colaboradoresRepository }: any) => {
        return new DeletarUniversoUsecase(
          universosRepository,
          colaboradoresRepository,
        )
      },
      {
        lifetime: Lifetime.SCOPED,
        dispose: (module: any) => module.dispose(),
      },
    ),
  })
  request.diScope.register({
    buscarUniversoPorIdUSecase: asFunction(
      ({ universosRepository }: any) => {
        return new BuscarUniversoPorIdUSecase(universosRepository)
      },
      {
        lifetime: Lifetime.SCOPED,
        dispose: (module: any) => module.dispose(),
      },
    ),
  })
  done()
}

export function diColaboradores(
  request: FastifyRequest,
  reply: FastifyReply,
  done: DoneFuncWithErrOrRes,
) {
  request.diScope.register({
    listarColaboradoresUsecase: asFunction(
      ({ colaboradoresRepository, lojasRepository }: any) => {
        return new ListarColaboradoresUseCase(
          colaboradoresRepository,
          lojasRepository,
        )
      },
      {
        lifetime: Lifetime.SCOPED,
        dispose: (module: any) => module.dispose(),
      },
    ),
  })
  request.diScope.register({
    checkInCheckOutUsecase: asFunction(
      ({ colaboradoresRepository }: any) => {
        return new CheckInOutUsecase(colaboradoresRepository)
      },
      {
        lifetime: Lifetime.SCOPED,
        dispose: (module: any) => module.dispose(),
      },
    ),
  })
  request.diScope.register({
    criarColaboradorUsecase: asFunction(
      ({ colaboradoresRepository }: any) => {
        return new CriarColaboradorUsecase(colaboradoresRepository)
      },
      {
        lifetime: Lifetime.SCOPED,
        dispose: (module: any) => module.dispose(),
      },
    ),
  })
  request.diScope.register({
    desativarColaboradorUsecase: asFunction(
      ({ colaboradoresRepository }: any) => {
        return new DesativarColaboradorUsecase(colaboradoresRepository)
      },
      {
        lifetime: Lifetime.SCOPED,
        dispose: (module: any) => module.dispose(),
      },
    ),
  })
  request.diScope.register({
    buscarColaboradorPorIdUseCase: asFunction(
      ({ colaboradoresRepository }: any) => {
        return new BuscarColaboradorPorIdUseCase(colaboradoresRepository)
      },
      {
        lifetime: Lifetime.SCOPED,
        dispose: (module: any) => module.dispose(),
      },
    ),
  })
  request.diScope.register({
    informacoesColaboradoresUsecase: asFunction(
      ({ colaboradoresRepository, lojasRepository }: any) => {
        return new InformacoesColaboradoresUsecase(
          colaboradoresRepository,
          lojasRepository,
        )
      },
      {
        lifetime: Lifetime.SCOPED,
        dispose: (module: any) => module.dispose(),
      },
    ),
  })
  request.diScope.register({
    authUsecase: asFunction(
      ({ colaboradoresRepository }: any) => {
        return new AuthUsecase(colaboradoresRepository)
      },
      {
        lifetime: Lifetime.SCOPED,
        dispose: (module: any) => module.dispose(),
      },
    ),
  })
  request.diScope.register({
    editarColaboradorUsecase: asFunction(
      ({ colaboradoresRepository }: any) => {
        return new EditarColaboradorUseCase(colaboradoresRepository)
      },
      {
        lifetime: Lifetime.SCOPED,
        dispose: (module: any) => module.dispose(),
      },
    ),
  })
  done()
}

export function diInvoices(
  request: FastifyRequest,
  reply: FastifyReply,
  done: DoneFuncWithErrOrRes,
) {
  request.diScope.register({
    importarInvoicesUseCase: asFunction(
      ({ invoicesRepository }: any) => {
        return new ImportarInvoiceUseCase(invoicesRepository)
      },
      {
        lifetime: Lifetime.SCOPED,
        dispose: (module: any) => module.dispose(),
      },
    ),
  })

  done()
}

// export function diMail(
//   request: FastifyRequest,
//   reply: FastifyReply,
//   done: DoneFuncWithErrOrRes,
// ) {
//   request.diScope.register({
//     enviarEmailPerdaSenhaUsecase: asFunction(
//       ({ colaboradoresRepository, ethrealMailProvider }: any) => {
//         return new EnviarEmailPerdaSenhaUsecase(
//           colaboradoresRepository,
//           ethrealMailProvider,
//         )
//       },
//       {
//         lifetime: Lifetime.SCOPED,
//         dispose: (module: any) => module.dispose(),
//       },
//     ),
//   })

//   done()
// }
