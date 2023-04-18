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

// src/modules/colaboradores/useCases/editarColaborador/editarColaboradorController.ts
var editarColaboradorController_exports = {};
__export(editarColaboradorController_exports, {
  editarColaborador: () => editarColaborador
});
module.exports = __toCommonJS(editarColaboradorController_exports);
var import_zod = require("zod");
async function editarColaborador(req, res) {
  const reqParamsSchema = import_zod.z.object({
    id: import_zod.z.coerce.number()
  });
  const reqBodySchema = import_zod.z.object({
    nome: import_zod.z.string(),
    email: import_zod.z.string(),
    tipo: import_zod.z.string(),
    endereco: import_zod.z.string().nullable(),
    telefone: import_zod.z.string().nullable(),
    universoId: import_zod.z.number(),
    funcao: import_zod.z.string(),
    empresa: import_zod.z.string().nullable(),
    administrador: import_zod.z.string(),
    brigadista: import_zod.z.string(),
    formacaoData: import_zod.z.string().nullable(),
    admissaoData: import_zod.z.string().nullable(),
    observacao: import_zod.z.string().nullable()
  });
  const editarColaboradorUsecase = req.diScope.resolve(
    "editarColaboradorUsecase"
  );
  const { id } = reqParamsSchema.parse(req.params);
  const data = reqBodySchema.parse(req.body);
  await editarColaboradorUsecase.execute({
    id,
    nome: data.nome,
    admin: data.administrador,
    admissao: data.admissaoData,
    brigadista: data.brigadista,
    email: data.email,
    empresa: data.empresa,
    endereco: data.endereco,
    formacao: data.formacaoData,
    funcao: data.funcao,
    observacao: data.observacao,
    telefone: data.telefone,
    universoId: data.universoId
  });
  return res.status(200).send(`usu\xE1rio editado com sucesso`);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  editarColaborador
});
