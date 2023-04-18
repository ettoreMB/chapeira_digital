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

// src/modules/invoice/infra/prisma/InvoiceRepository.ts
var InvoiceRepository_exports = {};
__export(InvoiceRepository_exports, {
  InvoiceRepository: () => InvoiceRepository
});
module.exports = __toCommonJS(InvoiceRepository_exports);

// src/db/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["error", "warn"]
});

// src/modules/invoice/infra/prisma/InvoiceRepository.ts
var InvoiceRepository = class {
  async criar(data) {
    const invoice = await prisma.tb_Lojas_Faturamentos.create({
      data: {
        Nota_Fiscal: data.Nota_Fiscal,
        Data_Faturamento: data.Data_Faturamento,
        Insert_Date: /* @__PURE__ */ new Date(),
        Loja_Sigla: data.Loja_Sigla,
        Pendente: true,
        Valor_Servicos: data.Valor_Servicos,
        Valor_Nota: data.Valor_Nota
      }
    });
    return invoice;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InvoiceRepository
});
