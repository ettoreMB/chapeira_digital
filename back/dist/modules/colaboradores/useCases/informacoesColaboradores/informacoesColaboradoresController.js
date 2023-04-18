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

// src/modules/colaboradores/useCases/informacoesColaboradores/informacoesColaboradoresController.ts
var informacoesColaboradoresController_exports = {};
__export(informacoesColaboradoresController_exports, {
  InformacoesColaboradoresController: () => InformacoesColaboradoresController
});
module.exports = __toCommonJS(informacoesColaboradoresController_exports);
var import_zod = require("zod");
var InformacoesColaboradoresController = class {
  async handle(req, res) {
    const reqSchema = import_zod.z.object({
      loja: import_zod.z.string()
    });
    const { loja } = reqSchema.parse(req.params);
    const informacoesColaboradoresUsecase = req.diScope.resolve(
      "informacoesColaboradoresUsecase"
    );
    const informacoes = await informacoesColaboradoresUsecase.execute(loja);
    return res.status(200).send(informacoes);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InformacoesColaboradoresController
});
