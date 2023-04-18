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

// src/shared/infra/http/routes/invoices.routes.ts
var invoices_routes_exports = {};
__export(invoices_routes_exports, {
  InvoicesRoutes: () => InvoicesRoutes
});
module.exports = __toCommonJS(invoices_routes_exports);

// src/modules/invoice/useCases/importarInvoice/importarInvoiceController.ts
async function ImportarInvoices(req, res) {
  const { file } = req;
  const importarInvoiceUsecase = req.diScope.resolve("importarInvoicesUseCase");
  await importarInvoiceUsecase.execute(file);
  return res.status(200).send();
}

// src/shared/infra/http/routes/invoices.routes.ts
var import_fastify_multer = __toESM(require("fastify-multer"));
var upload = (0, import_fastify_multer.default)({ dest: "/uploads" });
async function InvoicesRoutes(app) {
  app.get("/", () => {
  });
  app.get("/:loja", () => {
  });
  app.delete("/:nota", () => {
  });
  app.patch("/:nota", () => {
  });
  app.post("/importar", { preHandler: upload.single("file") }, ImportarInvoices);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InvoicesRoutes
});
