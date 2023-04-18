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

// src/modules/contatosDeEmergencia/useCases/criarContato/criarContatoDeEmergenciaController.ts
var criarContatoDeEmergenciaController_exports = {};
__export(criarContatoDeEmergenciaController_exports, {
  criarContatoDeEmergencia: () => criarContatoDeEmergencia
});
module.exports = __toCommonJS(criarContatoDeEmergenciaController_exports);
var import_zod = require("zod");
async function criarContatoDeEmergencia(req, res) {
  const reqParamsSchema = import_zod.z.object({
    lojaSigla: import_zod.z.string(),
    nomeContato: import_zod.z.string(),
    telefone: import_zod.z.string(),
    descricao: import_zod.z.string()
  });
  const criarContatoUseCase = req.diScope.resolve("criarContatoDeEmergencia");
  const { descricao, lojaSigla, nomeContato, telefone } = reqParamsSchema.parse(
    req.body
  );
  const { contato } = await criarContatoUseCase.execute({
    descricao,
    lojaSigla,
    nomeContato,
    telefone
  });
  return res.status(201).send(contato);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  criarContatoDeEmergencia
});
