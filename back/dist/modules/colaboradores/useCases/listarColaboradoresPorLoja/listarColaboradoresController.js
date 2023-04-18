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

// src/modules/colaboradores/useCases/listarColaboradoresPorLoja/listarColaboradoresController.ts
var listarColaboradoresController_exports = {};
__export(listarColaboradoresController_exports, {
  ListarColaboradoresController: () => ListarColaboradoresController
});
module.exports = __toCommonJS(listarColaboradoresController_exports);
var import_zod = require("zod");
var ListarColaboradoresController = class {
  async handle(req, res) {
    const reqParams = import_zod.z.object({
      nome: import_zod.z.string()
    });
    const reqQueryScehma = import_zod.z.object({
      universoId: import_zod.z.coerce.number().optional(),
      tipo: import_zod.z.string().optional()
    });
    const { nome } = reqParams.parse(req.params);
    const { universoId, tipo } = reqQueryScehma.parse(req.query);
    const listarColaboradoresUsecase = req.diScope.resolve(
      "listarColaboradoresUsecase"
    );
    const colaboradores = await listarColaboradoresUsecase.execute({
      nome,
      tipo,
      universoId
    });
    return res.status(200).send(colaboradores);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ListarColaboradoresController
});
