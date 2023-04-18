"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/shared/infra/http/routes/colaboradores.routes.ts
var colaboradores_routes_exports = {};
__export(colaboradores_routes_exports, {
  colaboradoresRoutes: () => colaboradoresRoutes
});
module.exports = __toCommonJS(colaboradores_routes_exports);

// src/modules/colaboradores/useCases/buscarPorId/buscarColaboradorPorIdController.ts
var import_zod = require("zod");
async function buscarColaboradorPorId(req, res) {
  const reqParamsSchema = import_zod.z.object({
    id: import_zod.z.coerce.number()
  });
  const { id } = reqParamsSchema.parse(req.params);
  const buscarColaboradorPorId2 = req.diScope.resolve(
    "buscarColaboradorPorIdUseCase"
  );
  const colaborador = await buscarColaboradorPorId2.execute(id);
  return res.status(200).send(colaborador);
}

// src/modules/colaboradores/useCases/cadastrarNovaSenha/CadastrarNovaSenhaController.ts
var import_zod2 = require("zod");
async function cadastrarNovaSenha(req, res) {
  const reqParamsSchema = import_zod2.z.object({
    loja: import_zod2.z.string()
  });
  const reqBodySchema = import_zod2.z.object({
    token: import_zod2.z.string(),
    senha: import_zod2.z.string()
  });
  const { loja } = reqParamsSchema.parse(req.params);
  const { token, senha } = reqBodySchema.parse(req.body);
  const cadastrarNovaSenhaUsecase = req.diScope.resolve(
    "cadastrarNovaSenhaUsecase"
  );
  await cadastrarNovaSenhaUsecase.execute(token, senha, loja);
  return res.status(200).send("nova senha registrada com sucesso");
}

// src/modules/colaboradores/useCases/CheckInCheckout/ChekcInOutCcontroller.ts
var import_zod3 = require("zod");
var ChekcInOutController = class {
  async handle(req, res) {
    const reqParam = import_zod3.z.object({
      id: import_zod3.z.coerce.number()
    });
    const { id } = reqParam.parse(req.params);
    const ip = req.socket.remoteAddress;
    const browser = req.headers["user-agent"];
    const checkInOutUseCase = req.diScope.resolve("checkInCheckOutUsecase");
    const resposta = await checkInOutUseCase.execute(
      id,
      String(ip),
      String(browser)
    );
    return res.status(200).send(resposta);
  }
};

// src/modules/colaboradores/useCases/criarColaborador/criarColaboradorController.ts
var import_zod4 = require("zod");
var CriarColaboradorController = class {
  async handle(req, res) {
    const reqBody = import_zod4.z.object({
      lojaSigla: import_zod4.z.string(),
      nome: import_zod4.z.string(),
      email: import_zod4.z.string().nullable(),
      tipo: import_zod4.z.enum(["Colaborador", "Visitante", "Terceiro"]),
      endereco: import_zod4.z.string().nullable(),
      telefone: import_zod4.z.string().nullable(),
      universoId: import_zod4.z.coerce.number(),
      funcao: import_zod4.z.string().nullable(),
      empresa: import_zod4.z.string().nullable(),
      administrador: import_zod4.z.enum(["Sim", "Nao"]).default("Nao"),
      brigadista: import_zod4.z.enum(["Sim", "Nao"]).default("Nao").nullable(),
      formacaoData: import_zod4.z.string().nullable(),
      admissaoData: import_zod4.z.string().nullable(),
      observacao: import_zod4.z.string().nullable()
    });
    const {
      lojaSigla,
      nome,
      email,
      tipo,
      endereco,
      telefone,
      universoId,
      funcao,
      empresa,
      administrador,
      brigadista,
      formacaoData,
      admissaoData,
      observacao
    } = reqBody.parse(req.body);
    const criarUsuarioUseCase = req.diScope.resolve("criarColaboradorUsecase");
    await criarUsuarioUseCase.execute({
      Loja_Sigla: lojaSigla,
      Nome: nome,
      Email: email,
      Tipo: tipo,
      Endereco: endereco,
      Telefone: telefone,
      Id_Universo: universoId,
      Funcao: funcao,
      Empresa: empresa,
      Administrador: administrador,
      Brigadista: brigadista,
      Formacao_Data: formacaoData,
      Admissao_Data: admissaoData,
      Observacao: observacao
    });
    res.status(200).send({
      lojaSigla,
      universoId,
      tipo,
      nome,
      funcao,
      email,
      administrador,
      brigadista,
      formacaoData
    });
  }
};

// src/modules/colaboradores/useCases/desativarColaborador/DesativarColaboradorController.ts
var import_zod5 = require("zod");
var DesativarColaboradorController = class {
  async handle(req, res) {
    const reqParamsSchema = import_zod5.z.object({
      id: import_zod5.z.coerce.number()
    });
    const { id } = reqParamsSchema.parse(req.params);
    const desativarColaboradorUsecase = req.diScope.resolve(
      "desativarColaboradorUsecase"
    );
    await desativarColaboradorUsecase.execute(id);
    return res.status(200).send("Colabodar desativado com sucesso");
  }
};

// src/modules/colaboradores/useCases/editarColaborador/editarColaboradorController.ts
var import_zod6 = require("zod");
async function editarColaborador(req, res) {
  const reqParamsSchema = import_zod6.z.object({
    id: import_zod6.z.coerce.number()
  });
  const reqBodySchema = import_zod6.z.object({
    nome: import_zod6.z.string(),
    email: import_zod6.z.string(),
    tipo: import_zod6.z.string(),
    endereco: import_zod6.z.string().nullable(),
    telefone: import_zod6.z.string().nullable(),
    universoId: import_zod6.z.number(),
    funcao: import_zod6.z.string(),
    empresa: import_zod6.z.string().nullable(),
    administrador: import_zod6.z.string(),
    brigadista: import_zod6.z.string(),
    formacaoData: import_zod6.z.string().nullable(),
    admissaoData: import_zod6.z.string().nullable(),
    observacao: import_zod6.z.string().nullable()
  });
  const editarColaboradorUsecase = req.diScope.resolve(
    "editarColaboradorUsecase"
  );
  const { id } = reqParamsSchema.parse(req.params);
  const data = reqBodySchema.parse(req.body);
  await editarColaboradorUsecase.execute({
    id,
    nome: data.nome,
    admin: data.administrador,
    admissao: data.admissaoData,
    brigadista: data.brigadista,
    email: data.email,
    empresa: data.empresa,
    endereco: data.endereco,
    formacao: data.formacaoData,
    funcao: data.funcao,
    observacao: data.observacao,
    telefone: data.telefone,
    universoId: data.universoId
  });
  return res.status(200).send(`usu\xE1rio editado com sucesso`);
}

// src/modules/colaboradores/infra/prisma/colaboradoresRepository.ts
var import_crypto = require("crypto");

// src/db/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["error", "warn"]
});

// src/modules/colaboradores/infra/prisma/colaboradoresRepository.ts
var ColaboradoresRepository = class {
  constructor() {
    this.db = prisma.tb_Colaboradores;
  }
  async editar({
    Id,
    Nome,
    Administrador,
    Senha,
    Id_Universo,
    Brigadista,
    Formacao_Data,
    Admissao_Data,
    Email,
    Telefone,
    Funcao,
    Endereco,
    Observacao,
    Empresa
  }) {
    const colborador = await this.db.update({
      where: { Id },
      data: {
        Nome,
        Administrador,
        Id_Universo,
        Brigadista,
        Formacao_Data,
        Admissao_Data,
        Senha,
        Email,
        Telefone,
        Funcao,
        Endereco,
        Observacao,
        Empresa
      }
    });
    return colborador;
  }
  async listarColaboradoresPorTipoOuUniverso({
    sigla,
    tipo,
    universoId
  }) {
    if (tipo) {
      const colaboradores2 = await this.db.findMany({
        where: {
          Loja_Sigla: sigla,
          Ativo: "Sim",
          Tipo: tipo
        },
        include: {
          tb_universos: {
            select: {
              Universo: true
            }
          }
        }
      });
      return colaboradores2;
    }
    if (universoId) {
      const colaboradores2 = await this.db.findMany({
        where: {
          Loja_Sigla: sigla,
          Ativo: "Sim",
          Id_Universo: universoId
        },
        include: {
          tb_universos: {
            select: {
              Universo: true
            }
          }
        }
      });
      return colaboradores2;
    }
    const colaboradores = await this.db.findMany({
      where: {
        Loja_Sigla: sigla,
        Ativo: "Sim",
        OR: [{ Tipo: "Colaborador" }]
      },
      include: {
        tb_universos: {
          select: {
            Universo: true
          }
        }
      }
    });
    return colaboradores;
  }
  async desativarColaborador(id, {
    Acao,
    Administrador,
    Ativo,
    CheckIn,
    CheckIn_Status,
    Cor,
    Id_Universo,
    Senha,
    Status
  }) {
    await this.db.update({
      where: {
        Id: id
      },
      data: {
        Acao,
        Administrador,
        Ativo,
        CheckIn,
        CheckIn_Status,
        Cor,
        Id_Universo,
        Senha,
        Status
      }
    });
  }
  async buscarPorId(id) {
    const colaborador = await this.db.findFirst({
      where: {
        Id: id
      },
      include: {
        tb_universos: {
          select: {
            Universo: true,
            Id: true
          }
        }
      }
    });
    return colaborador;
  }
  async buscarPorEmail(email) {
    const colaborador = await this.db.findFirst({
      where: {
        Email: email
      }
    });
    return colaborador;
  }
  async criar({
    Loja_Sigla,
    Nome,
    Email,
    Tipo,
    Endereco,
    Telefone,
    Id_Universo,
    Senha,
    Funcao,
    Empresa,
    Administrador,
    Brigadista,
    Formacao_Data,
    Admissao_Data,
    Observacao
  }) {
    const colaborador = await this.db.create({
      data: {
        Loja_Sigla,
        Ativo: "Sim",
        Id_Key: `${Loja_Sigla}-${(0, import_crypto.randomUUID)()}`,
        Id_Universo,
        Tipo,
        Nome,
        Funcao: Funcao && null,
        Email,
        Administrador,
        Endereco,
        Empresa,
        Telefone,
        Senha: Senha || (0, import_crypto.randomUUID)(),
        Brigadista,
        Formacao_Data: Formacao_Data && null,
        Admissao_Data,
        Insert_Date: String(/* @__PURE__ */ new Date()),
        Observacao
      }
    });
    return colaborador;
  }
  async checkIn(id, {
    checkIn,
    status,
    checkInStatus,
    checkInDate,
    acao,
    cor,
    ip,
    browser
  }) {
    await this.db.update({
      where: {
        Id: id
      },
      data: {
        CheckIn: checkIn,
        CheckIn_Browser: browser,
        CheckIn_Date: checkInDate,
        CheckIn_IP: ip,
        CheckIn_Status: checkInStatus,
        Status: status,
        Acao: acao,
        Cor: cor
      }
    });
  }
  updateAdmin(id, Administrador) {
    throw new Error("Method not implemented.");
  }
  async informacaoColaboradores(loja) {
    const colaboradores = await prisma.tb_Colaboradores.count({
      where: {
        Loja_Sigla: loja,
        Ativo: "Sim",
        Tipo: "Colaboradore"
      }
    });
    const brigadistas = await prisma.tb_Colaboradores.count({
      where: {
        Loja_Sigla: loja,
        Ativo: "Sim",
        Tipo: "Colaboradore",
        Brigadista: "Sim"
      }
    });
    const terceiros = await prisma.tb_Colaboradores.count({
      where: {
        Loja_Sigla: loja,
        Ativo: "Sim",
        Tipo: "Terceiro"
      }
    });
    const visitantes = await prisma.tb_Colaboradores.count({
      where: {
        Loja_Sigla: loja,
        Ativo: "Sim",
        Tipo: "Terceiro"
      }
    });
    const offline = await prisma.tb_Colaboradores.count({
      where: {
        Loja_Sigla: loja,
        Ativo: "Sim",
        Status: "Ausente"
      }
    });
    return { colaboradores, brigadistas, terceiros, visitantes, offline };
  }
};

// src/shared/errors/AppErros.ts
var AppErrors = class {
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/modules/colaboradores/useCases/enviarEmailPerdaSenha/enviarEmailPerdaSenhaUsecase.ts
var import_node_path = __toESM(require("path"));
var EnviarEmailPerdaSenhaUsecase = class {
  constructor(colaboradorRepository, lojaRepository, mailProvider) {
    this.colaboradorRepository = colaboradorRepository;
    this.lojaRepository = lojaRepository;
    this.mailProvider = mailProvider;
  }
  async execute(email, lojaSigla, token) {
    const colaborador = await this.colaboradorRepository.buscarPorEmail(email);
    const loja = await this.lojaRepository.buscarPorSiglaOuNome(lojaSigla);
    if (!colaborador) {
      throw new AppErrors("Colaborador n\xE3o encontrado", 404);
    }
    if (colaborador.Administrador === "Nao") {
      throw new AppErrors("N\xE3o autorizado", 401);
    }
    if (lojaSigla.toUpperCase() !== loja?.Pasta_WEB?.toUpperCase() && lojaSigla.toUpperCase() !== loja?.Loja_Sigla.toUpperCase()) {
      throw new AppErrors("Loja n\xE3o encontrada", 404);
    }
    const templatePath = import_node_path.default.resolve("views", "emails", "recuperarSenha.hbs");
    const variaveis = {
      nome: colaborador.Nome,
      token,
      lojaSigla,
      link: `http://localhost:3000/${loja.Pasta_WEB}/recuperarSenha/${token}`
    };
    await this.mailProvider.enviarEmail(
      email,
      "Recupera\xE7\xE3o de senha chapeira digital",
      variaveis,
      templatePath
    );
  }
};

// src/modules/lojas/infra/prisma/lojaRepository.ts
var import_client2 = require("@prisma/client");
var repository = prisma.tb_Lojas;
var LojaRepository = class {
  async buscarPorCnpj(cnpj) {
    const loja = await repository.findFirst({
      where: {
        CNPJ: cnpj
      }
    });
    return loja;
  }
  async criar({
    Loja_Sigla,
    Loja,
    Loja_Endereco,
    Loja_Cidade,
    Loja_UF,
    Loja_Telefone,
    Responsavel,
    Responsavel_Email,
    Responsavel_Telefone,
    CNPJ
  }) {
    const loja = await repository.create({
      data: {
        CNPJ,
        Ativo: "Sim",
        Loja,
        Loja_Sigla,
        Loja_Endereco,
        Loja_Cidade,
        Loja_UF,
        Loja_Telefone,
        Razao_Social: "IGUASPORT LTDA",
        Responsavel,
        Pasta_WEB: `${Loja_UF}-${Loja}`,
        Responsavel_Email,
        Responsavel_Telefone,
        Adm_Email: Responsavel_Email,
        Faturamento_Responsavel: Responsavel,
        Faturamento_Email: Responsavel_Email,
        Faturamento_Telefone: Responsavel_Telefone
      }
    });
    return loja;
  }
  async editar(data) {
    const loja = await repository.update({
      where: {
        Id: data.Id
      },
      data: {
        Loja_Endereco: data.Loja_Endereco,
        Loja_Cidade: data.Loja_Cidade,
        Loja_Telefone: data.Loja_Telefone,
        Loja_Horario: data.Loja_Horario
      }
    });
    return loja;
  }
  async deletar(id) {
    await repository.update({
      where: {
        Id: id
      },
      data: {
        Ativo: "Nao"
      }
    });
  }
  async buscarPorSiglaOuNome(loja) {
    const resultado = await repository.findFirst({
      where: {
        OR: [
          {
            Loja_Sigla: loja
          },
          {
            Pasta_WEB: loja
          }
        ]
      }
    });
    return resultado;
  }
  async buscarPorId(id) {
    const loja = await repository.findFirst({
      where: {
        Id: id
      }
    });
    return loja;
  }
  async listar() {
    const lojas = await prisma.tb_Lojas.findMany({
      where: {
        Ativo: "Sim"
      },
      orderBy: {
        Loja: "asc"
      }
    });
    return lojas;
  }
  async dashBoard(sigla) {
    const result = await prisma.$queryRaw(
      import_client2.Prisma.sql`select 
      tbc.Loja_Sigla,
      tbu.Universo,
      tbu.Zona,
      tbu.Andar,
      sum( case when tbc.Tipo = 'Colaborador' OR tbc.Tipo = 'Brigadista' then 1 else 0 end) as total_colaboradores,
      sum( case when tbc.Tipo = 'Colaborador' OR tbc.Brigadista = 'Nao' then 1 else 0 end) as total_colaboradores_nao_brigadistas,
      sum( case when tbc.Tipo = 'Colaborador' OR tbc.Tipo ='Brigadista' AND tbc.Status = 'Presente' then 1 else 0 end) as colaboradores_presentes,
      sum( case when tbc.Tipo = 'Colaborador' AND tbc.Status = 'Ausente' then 1 else 0 end) as colaboradores_ausentes,
      sum( case when tbc.Brigadista = 'Sim'  then 1 else 0 end) as total_brigadistas,
      sum( case when tbc.Brigadista = 'Sim' AND tbc.Status = 'Presente' then 1 else 0 end) as brigadistas_presentes,
      sum( case when tbc.Brigadista = 'Sim' AND tbc.Status = 'Ausente' then 1 else 0 end) as brigadistas_ausentes,
      sum( case when tbc.Tipo = 'Visitante' then 1 else 0 end) as total_visitantes,
      sum( case when tbc.Tipo = 'Visitante'AND tbc.Status =  'Presente' then 1 else 0 end) as total_visitantes_presentes,
      sum( case when tbc.Tipo = 'Visitante'AND tbc.Status =  'Ausente' then 1 else 0 end) as total_visitante_ausentes,
      sum( case when tbc.Tipo = 'Terceiro' then 1 else 0 end) as total_terceiros,
      sum( case when tbc.Tipo = 'Terceiro'AND tbc.Status =  'Presente' then 1 else 0 end) as total_terceiros_presentes,
      sum( case when tbc.Tipo = 'Terceiro'AND tbc.Status =  'Ausente' then 1 else 0 end) as total_terceiros_ausentes
      from tb_Colaboradores as tbc
      left join tb_Universos as tbu
        on tbu.Id = tbc.Id_Universo
      where tbc.Loja_Sigla = ${sigla} AND tbc.Ativo = 'Sim'
      group by tbu.Zona, tbc.Loja_Sigla,tbu.Andar,tbu.Universo ;`
    );
    return result;
  }
};

// src/shared/container/providers/MailProvider/nodemailer/OfficeMailer.ts
var import_node_fs = __toESM(require("fs"));
var nodemailer = __toESM(require("nodemailer"));
var import_handlebars = __toESM(require("handlebars"));
var OficeMailProvider = class {
  constructor() {
    const transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      auth: {
        user: "suporte@chapeira.com.br",
        pass: "@Mepm2412"
      }
    });
    this.client = transporter;
  }
  async enviarEmail(to, subject, variables, path2) {
    const templateFileContent = import_node_fs.default.readFileSync(path2).toString("utf-8");
    const templateParse = import_handlebars.default.compile(templateFileContent);
    const templateHtml = templateParse(variables);
    const email = await this.client.sendMail({
      from: "suporte@chapeira.com.br",
      to,
      subject,
      html: templateHtml
    });
    console.log("Message sent: %s", email);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(email));
  }
};

// src/shared/factories/make-etherealMail.ts
function makeMailUsecase() {
  const colaboradoresRepository = new ColaboradoresRepository();
  const mailProvider = new OficeMailProvider();
  const lojaRepository = new LojaRepository();
  const enviarEmailPerdaSenhaUsecase = new EnviarEmailPerdaSenhaUsecase(
    colaboradoresRepository,
    lojaRepository,
    mailProvider
  );
  return enviarEmailPerdaSenhaUsecase;
}

// src/modules/colaboradores/useCases/enviarEmailPerdaSenha/enviarEmailPerdaSenhaController.ts
var import_zod7 = require("zod");
async function enviarEmailPerdaSenha(req, res) {
  const reqBodySchema = import_zod7.z.object({
    email: import_zod7.z.string(),
    loja: import_zod7.z.string()
  });
  const { email, loja } = reqBodySchema.parse(req.body);
  const enviarEmailPerdaSenhaUsecase = makeMailUsecase();
  const token = await res.jwtSign({}, { sign: { sub: email } });
  await enviarEmailPerdaSenhaUsecase.execute(email, loja, token);
  return res.status(200).send("Email enviado com sucesso");
}

// src/modules/colaboradores/useCases/informacoesColaboradores/informacoesColaboradoresController.ts
var import_zod8 = require("zod");
var InformacoesColaboradoresController = class {
  async handle(req, res) {
    const reqSchema = import_zod8.z.object({
      loja: import_zod8.z.string()
    });
    const { loja } = reqSchema.parse(req.params);
    const informacoesColaboradoresUsecase = req.diScope.resolve(
      "informacoesColaboradoresUsecase"
    );
    const informacoes = await informacoesColaboradoresUsecase.execute(loja);
    return res.status(200).send(informacoes);
  }
};

// src/modules/colaboradores/useCases/listarColaboradoresPorLoja/listarColaboradoresController.ts
var import_zod9 = require("zod");
var ListarColaboradoresController = class {
  async handle(req, res) {
    const reqParams = import_zod9.z.object({
      nome: import_zod9.z.string()
    });
    const reqQueryScehma = import_zod9.z.object({
      universoId: import_zod9.z.coerce.number().optional(),
      tipo: import_zod9.z.string().optional()
    });
    const { nome } = reqParams.parse(req.params);
    const { universoId, tipo } = reqQueryScehma.parse(req.query);
    const listarColaboradoresUsecase = req.diScope.resolve(
      "listarColaboradoresUsecase"
    );
    const colaboradores = await listarColaboradoresUsecase.execute({
      nome,
      tipo,
      universoId
    });
    return res.status(200).send(colaboradores);
  }
};

// src/shared/middlewares/verificarJwt.ts
async function verificarJwt(req, res) {
  try {
    await req.jwtVerify();
  } catch (error) {
    return res.status(401).send({ message: "N\xE3o autorizado." });
  }
}

// src/shared/infra/http/routes/colaboradores.routes.ts
var listarColaboradoresController = new ListarColaboradoresController();
var chekcInOutCcontroller = new ChekcInOutController();
var criarColaboradorController = new CriarColaboradorController();
var desativarColaboradorController = new DesativarColaboradorController();
var informacoesColaboradoresController = new InformacoesColaboradoresController();
async function colaboradoresRoutes(app) {
  app.patch("/adminupdate/:id", () => {
  });
  app.post(
    "/criar",
    { onRequest: [verificarJwt] },
    criarColaboradorController.handle
  );
  app.get("/:nome", listarColaboradoresController.handle);
  app.get("/:sigla/dashboard", () => {
  });
  app.put("/checkinout/:id", chekcInOutCcontroller.handle);
  app.put(
    "/desativar/:id",
    { onRequest: [verificarJwt] },
    desativarColaboradorController.handle
  );
  app.get("/informacoes/:loja", informacoesColaboradoresController.handle);
  app.get(
    "/colaborador/:id",
    { onRequest: [verificarJwt] },
    buscarColaboradorPorId
  );
  app.put("/editar/:id", editarColaborador);
  app.post(
    "/recuperarSenha",
    { onRequest: verificarJwt },
    enviarEmailPerdaSenha
  );
  app.post("/novaSenha/:loja", cadastrarNovaSenha);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  colaboradoresRoutes
});
