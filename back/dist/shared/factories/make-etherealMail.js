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

// src/shared/factories/make-etherealMail.ts
var make_etherealMail_exports = {};
__export(make_etherealMail_exports, {
  makeMailUsecase: () => makeMailUsecase
});
module.exports = __toCommonJS(make_etherealMail_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  makeMailUsecase
});
