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

// src/modules/invoice/useCases/importarInvoice/importarInvoiceUsecase.ts
var importarInvoiceUsecase_exports = {};
__export(importarInvoiceUsecase_exports, {
  ImportarInvoiceUseCase: () => ImportarInvoiceUseCase
});
module.exports = __toCommonJS(importarInvoiceUsecase_exports);
var import_fs = require("fs");
var import_csv_parse = require("csv-parse");
var ImportarInvoiceUseCase = class {
  constructor(invoiceRepository) {
    this.invoiceRepository = invoiceRepository;
  }
  carregarArquivo(arquivo) {
    return new Promise((resolve, reject) => {
      const stream = (0, import_fs.createReadStream)(arquivo.path);
      const invoices = [];
      stream.pipe((0, import_csv_parse.parse)({ delimiter: "," })).on("data", async (linha) => {
        const [
          Loja_Sigla,
          Nota_Fiscal,
          Valor_Servicos,
          Valor_Nota,
          Data_Faturamento,
          Data_Vencimento
        ] = linha;
        invoices.push({
          Loja_Sigla,
          Nota_Fiscal,
          Valor_Servicos,
          Valor_Nota,
          Data_Faturamento: new Date(Data_Faturamento),
          Data_Vencimento: new Date(Data_Vencimento)
        });
      }).on("end", () => {
        import_fs.promises.unlink(arquivo.path);
        resolve(invoices);
      }).on("error", (err) => {
        reject(err);
      });
    });
  }
  async execute(arquivo) {
    const invoices = await this.carregarArquivo(arquivo);
    invoices.map(async (invoice) => {
      const {
        Loja_Sigla,
        Nota_Fiscal,
        Valor_Servicos,
        Valor_Nota,
        Data_Faturamento,
        Data_Vencimento
      } = invoice;
      await this.invoiceRepository.criar({
        Loja_Sigla,
        Data_Faturamento,
        Data_Vencimento,
        Nota_Fiscal,
        Valor_Nota,
        Valor_Servicos
      });
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ImportarInvoiceUseCase
});
