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

// src/modules/invoice/useCases/importarInvoice/importarInvoiceController.ts
var importarInvoiceController_exports = {};
__export(importarInvoiceController_exports, {
  ImportarInvoices: () => ImportarInvoices
});
module.exports = __toCommonJS(importarInvoiceController_exports);
async function ImportarInvoices(req, res) {
  const { file } = req;
  const importarInvoiceUsecase = req.diScope.resolve("importarInvoicesUseCase");
  await importarInvoiceUsecase.execute(file);
  return res.status(200).send();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ImportarInvoices
});
