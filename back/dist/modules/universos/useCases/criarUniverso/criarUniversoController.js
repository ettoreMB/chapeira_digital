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

// src/modules/universos/useCases/criarUniverso/criarUniversoController.ts
var criarUniversoController_exports = {};
__export(criarUniversoController_exports, {
  CriarUniversoController: () => CriarUniversoController
});
module.exports = __toCommonJS(criarUniversoController_exports);

// src/shared/errors/AppErros.ts
var AppErrors = class {
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/modules/universos/useCases/criarUniverso/criarUniversoController.ts
var import_zod = require("zod");
var CriarUniversoController = class {
  async handle(req, res) {
    const reqBody = import_zod.z.object({
      lojaSigla: import_zod.z.string(),
      universo: import_zod.z.string(),
      zona: import_zod.z.string().default("0"),
      andar: import_zod.z.string().default("0")
    });
    const data = reqBody.parse(req.body);
    try {
      const criarUniversoUseCase = req.diScope.resolve("criarUniversoUsecase");
      await criarUniversoUseCase.execute({
        Universo: data.universo,
        Andar: data.andar,
        Loja_Sigla: data.lojaSigla,
        Zona: data.zona
      });
    } catch (error) {
      if (error instanceof AppErrors) {
        return res.status(409).send({ message: error.message });
      }
      throw error;
    }
    return res.status(200).send("Universo crido com sucesso");
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CriarUniversoController
});
