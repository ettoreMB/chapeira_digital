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

// src/modules/universos/useCases/listarUniversosPorLoja/listarUniversosPorLojaController.ts
var listarUniversosPorLojaController_exports = {};
__export(listarUniversosPorLojaController_exports, {
  ListarUniversosPorLojaController: () => ListarUniversosPorLojaController
});
module.exports = __toCommonJS(listarUniversosPorLojaController_exports);
var import_zod = require("zod");
var ListarUniversosPorLojaController = class {
  async handle(req, res) {
    const reqParams = import_zod.z.object({
      sigla: import_zod.z.string()
    });
    const { sigla } = reqParams.parse(req.params);
    const listarUniversosPorLojaUsecase = req.diScope.resolve(
      "listarUniversosPorLojaUsecase"
    );
    const universos = await listarUniversosPorLojaUsecase.execute(sigla);
    return res.status(200).send(universos);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ListarUniversosPorLojaController
});
