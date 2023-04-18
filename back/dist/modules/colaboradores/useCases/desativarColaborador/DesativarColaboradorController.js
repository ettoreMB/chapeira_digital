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

// src/modules/colaboradores/useCases/desativarColaborador/DesativarColaboradorController.ts
var DesativarColaboradorController_exports = {};
__export(DesativarColaboradorController_exports, {
  DesativarColaboradorController: () => DesativarColaboradorController
});
module.exports = __toCommonJS(DesativarColaboradorController_exports);
var import_zod = require("zod");
var DesativarColaboradorController = class {
  async handle(req, res) {
    const reqParamsSchema = import_zod.z.object({
      id: import_zod.z.coerce.number()
    });
    const { id } = reqParamsSchema.parse(req.params);
    const desativarColaboradorUsecase = req.diScope.resolve(
      "desativarColaboradorUsecase"
    );
    await desativarColaboradorUsecase.execute(id);
    return res.status(200).send("Colabodar desativado com sucesso");
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DesativarColaboradorController
});
