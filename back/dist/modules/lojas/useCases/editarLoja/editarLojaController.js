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

// src/modules/lojas/useCases/editarLoja/editarLojaController.ts
var editarLojaController_exports = {};
__export(editarLojaController_exports, {
  editarLoja: () => editarLoja
});
module.exports = __toCommonJS(editarLojaController_exports);
var import_zod = require("zod");
async function editarLoja(req, res) {
  const reqParamSchema = import_zod.z.object({
    id: import_zod.coerce.number()
  });
  const reqBodySchema = import_zod.z.object({
    endereco: import_zod.z.string(),
    telefone: import_zod.z.string().nullable(),
    cidade: import_zod.z.string(),
    horario: import_zod.z.string().nullable()
  });
  const { id } = reqParamSchema.parse(req.params);
  const { cidade, endereco, horario, telefone } = reqBodySchema.parse(req.body);
  const editarLojaUsecase = req.diScope.resolve("editarLojaUsecase");
  await editarLojaUsecase.execute(id, {
    Loja_Endereco: endereco,
    Loja_Horario: horario,
    Loja_Telefone: telefone,
    Loja_Cidade: cidade
  });
  return res.status(200).send();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  editarLoja
});
