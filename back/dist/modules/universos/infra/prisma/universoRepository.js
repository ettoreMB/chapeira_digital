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

// src/modules/universos/infra/prisma/universoRepository.ts
var universoRepository_exports = {};
__export(universoRepository_exports, {
  UniversoRepository: () => UniversoRepository
});
module.exports = __toCommonJS(universoRepository_exports);

// src/db/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["error", "warn"]
});

// src/modules/universos/infra/prisma/universoRepository.ts
var import_node_crypto = require("crypto");
var db = prisma.tb_Universos;
var UniversoRepository = class {
  async deletar(id) {
    await db.delete({
      where: {
        Id: id
      }
    });
  }
  async editar(data) {
    const universo = await db.update({
      where: {
        Id: data.Id
      },
      data: {
        Universo: data.Universo,
        Zona: data.Zona,
        Andar: data.Andar
      }
    });
    return universo;
  }
  async buscarPorId(id) {
    const universo = await db.findFirst({
      where: {
        Id: id
      }
    });
    return universo;
  }
  async criar({ Loja_Sigla, Universo, Andar, Zona }) {
    const universo = await prisma.tb_Universos.create({
      data: {
        Id_Key: (0, import_node_crypto.randomUUID)(),
        Loja_Sigla,
        Universo,
        Andar,
        Zona,
        Insert_Date: /* @__PURE__ */ new Date(),
        Update_Date: null,
        Update_User: null,
        Insert_User: null
      }
    });
    return universo;
  }
  async buscarUniversosPorLoja(sigla) {
    const universos = await db.findMany({
      where: {
        Loja_Sigla: sigla
      }
    });
    return universos;
  }
  async buscarUniversoPorNomeELoja(nome, lojaSigla) {
    const universo = await db.findFirst({
      where: {
        Loja_Sigla: lojaSigla,
        AND: {
          Universo: nome
        }
      }
    });
    return universo;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UniversoRepository
});
