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

// src/modules/universos/useCases/editarUniverso/editarUniversoController.ts
var editarUniversoController_exports = {};
__export(editarUniversoController_exports, {
  EditarUniversoController: () => EditarUniversoController
});
module.exports = __toCommonJS(editarUniversoController_exports);
var import_zod = require("zod");
var EditarUniversoController = class {
  async handle(req, res) {
    const reqBody = import_zod.z.object({
      id: import_zod.z.number(),
      universo: import_zod.z.string(),
      zona: import_zod.z.string(),
      andar: import_zod.z.string()
    });
    const { id, universo, zona, andar } = reqBody.parse(req.body);
    const editarUniversoUseCase = req.diScope.resolve("editarUniversoUsecase");
    await editarUniversoUseCase.execute({
      id,
      Universo: universo,
      Zona: zona,
      Andar: andar
    });
    return res.status(200).send(`Universo alterado com sucesso`);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EditarUniversoController
});
