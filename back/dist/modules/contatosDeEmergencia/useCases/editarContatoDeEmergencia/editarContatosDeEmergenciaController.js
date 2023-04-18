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

// src/modules/contatosDeEmergencia/useCases/editarContatoDeEmergencia/editarContatosDeEmergenciaController.ts
var editarContatosDeEmergenciaController_exports = {};
__export(editarContatosDeEmergenciaController_exports, {
  editarContatoDeEmergencia: () => editarContatoDeEmergencia
});
module.exports = __toCommonJS(editarContatosDeEmergenciaController_exports);
var import_zod = require("zod");
async function editarContatoDeEmergencia(req, res) {
  const reqBodySchema = import_zod.z.object({
    id: import_zod.z.coerce.number(),
    contato: import_zod.z.string(),
    telefone: import_zod.z.string(),
    descricao: import_zod.z.string().nullable(),
    endereco: import_zod.z.string().nullable()
  });
  const editarContatoUseCase = req.diScope.resolve("editarContatoDeEmergencia");
  const { id, descricao, contato, telefone, endereco } = reqBodySchema.parse(
    req.body
  );
  await editarContatoUseCase.execute({
    id,
    descricao,
    contato,
    telefone,
    endereco
  });
  return res.status(201).send("Contato editado com sucesso ");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  editarContatoDeEmergencia
});
