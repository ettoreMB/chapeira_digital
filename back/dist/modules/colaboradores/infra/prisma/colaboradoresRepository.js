"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/modules/colaboradores/infra/prisma/colaboradoresRepository.ts
var colaboradoresRepository_exports = {};
__export(colaboradoresRepository_exports, {
  ColaboradoresRepository: () => ColaboradoresRepository
});
module.exports = __toCommonJS(colaboradoresRepository_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ColaboradoresRepository
});
