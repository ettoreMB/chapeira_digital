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

// src/modules/cidades/infra/prisma/repository/cidadesRepository.ts
var cidadesRepository_exports = {};
__export(cidadesRepository_exports, {
  CidadeRepository: () => CidadeRepository
});
module.exports = __toCommonJS(cidadesRepository_exports);

// src/db/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["error", "warn"]
});

// src/modules/cidades/infra/prisma/repository/cidadesRepository.ts
var db = prisma.tb_Cidades;
var CidadeRepository = class {
  async criar(data) {
    await db.create({
      data: {
        Cidade: data.cidade,
        Pais_Sigla: "BR",
        Estado_Sigla: data.estadoSigla,
        Insert_Date: /* @__PURE__ */ new Date()
      }
    });
  }
  async buscarPorCidade(cidade) {
    const resposta = await db.findFirst({
      where: {
        Cidade: cidade
      }
    });
    return resposta;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CidadeRepository
});
