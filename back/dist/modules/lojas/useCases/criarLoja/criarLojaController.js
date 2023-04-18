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

// src/modules/lojas/useCases/criarLoja/criarLojaController.ts
var criarLojaController_exports = {};
__export(criarLojaController_exports, {
  CriarLojaController: () => CriarLojaController
});
module.exports = __toCommonJS(criarLojaController_exports);

// src/shared/errors/AppErros.ts
var AppErrors = class {
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/modules/lojas/useCases/criarLoja/criarLojaController.ts
var import_zod = require("zod");
var CriarLojaController = class {
  async handle(req, res) {
    const reqBodySchema = import_zod.z.object({
      Loja_Sigla: import_zod.z.string(),
      Loja: import_zod.z.string(),
      Loja_Endereco: import_zod.z.string(),
      Loja_Cidade: import_zod.z.string(),
      Loja_UF: import_zod.z.string(),
      Loja_Telefone: import_zod.z.string().nullable(),
      Responsavel: import_zod.z.string(),
      Responsavel_Email: import_zod.z.string().email(),
      Responsavel_Telefone: import_zod.z.string(),
      CNPJ: import_zod.z.coerce.number()
    });
    const data = reqBodySchema.parse(req.body);
    const criarLojaUseCase = req.diScope.resolve("criarLojaUseCase");
    try {
      await criarLojaUseCase.execute(data);
    } catch (error) {
      if (error instanceof AppErrors) {
        return res.status(409).send({ message: error.message });
      }
      throw error;
    }
    return res.status(200).send();
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CriarLojaController
});
