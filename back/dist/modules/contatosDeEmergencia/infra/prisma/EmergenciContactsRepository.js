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

// src/modules/contatosDeEmergencia/infra/prisma/EmergenciContactsRepository.ts
var EmergenciContactsRepository_exports = {};
__export(EmergenciContactsRepository_exports, {
  ContatosEmergenciaRepository: () => ContatosEmergenciaRepository
});
module.exports = __toCommonJS(EmergenciContactsRepository_exports);

// src/db/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["error", "warn"]
});

// src/modules/contatosDeEmergencia/infra/prisma/EmergenciContactsRepository.ts
var ContatosEmergenciaRepository = class {
  async buscarPorNomeELoja(lojaSigla, nome) {
    const contato = await prisma.tb_Contatos_Emergencia.findFirst({
      where: {
        Loja_Sigla: lojaSigla,
        AND: {
          Contato: nome
        }
      }
    });
    return contato;
  }
  async criar({
    Contato,
    Descricao,
    Telefone,
    Loja_Sigla
  }) {
    const contato = await prisma.tb_Contatos_Emergencia.create({
      data: {
        Contato,
        Descricao,
        Loja_Sigla,
        Telefone,
        Insert_Date: /* @__PURE__ */ new Date()
      }
    });
    return contato;
  }
  async buscarPorId(id) {
    const contato = await prisma.tb_Contatos_Emergencia.findUnique({
      where: {
        Id: id
      }
    });
    return contato;
  }
  async editar(contato) {
    const result = await prisma.tb_Contatos_Emergencia.update({
      where: {
        Id: contato.Id
      },
      data: {
        Contato: contato.Contato,
        Endereco: contato.Endereco,
        Telefone: contato.Telefone,
        Update_Date: /* @__PURE__ */ new Date(),
        Descricao: contato.Descricao
      }
    });
    return result;
  }
  async getAll(sigla) {
    const contacts = await prisma.tb_Contatos_Emergencia.findMany({
      where: { Loja_Sigla: sigla }
    });
    return contacts;
  }
  async deletar(id) {
    await prisma.tb_Contatos_Emergencia.delete({
      where: {
        Id: id
      }
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ContatosEmergenciaRepository
});
