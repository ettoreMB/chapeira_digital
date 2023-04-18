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

// src/modules/colaboradores/useCases/criarColaborador/criarColaboradorController.ts
var criarColaboradorController_exports = {};
__export(criarColaboradorController_exports, {
  CriarColaboradorController: () => CriarColaboradorController
});
module.exports = __toCommonJS(criarColaboradorController_exports);
var import_zod = require("zod");
var CriarColaboradorController = class {
  async handle(req, res) {
    const reqBody = import_zod.z.object({
      lojaSigla: import_zod.z.string(),
      nome: import_zod.z.string(),
      email: import_zod.z.string().nullable(),
      tipo: import_zod.z.enum(["Colaborador", "Visitante", "Terceiro"]),
      endereco: import_zod.z.string().nullable(),
      telefone: import_zod.z.string().nullable(),
      universoId: import_zod.z.coerce.number(),
      funcao: import_zod.z.string().nullable(),
      empresa: import_zod.z.string().nullable(),
      administrador: import_zod.z.enum(["Sim", "Nao"]).default("Nao"),
      brigadista: import_zod.z.enum(["Sim", "Nao"]).default("Nao").nullable(),
      formacaoData: import_zod.z.string().nullable(),
      admissaoData: import_zod.z.string().nullable(),
      observacao: import_zod.z.string().nullable()
    });
    const {
      lojaSigla,
      nome,
      email,
      tipo,
      endereco,
      telefone,
      universoId,
      funcao,
      empresa,
      administrador,
      brigadista,
      formacaoData,
      admissaoData,
      observacao
    } = reqBody.parse(req.body);
    const criarUsuarioUseCase = req.diScope.resolve("criarColaboradorUsecase");
    await criarUsuarioUseCase.execute({
      Loja_Sigla: lojaSigla,
      Nome: nome,
      Email: email,
      Tipo: tipo,
      Endereco: endereco,
      Telefone: telefone,
      Id_Universo: universoId,
      Funcao: funcao,
      Empresa: empresa,
      Administrador: administrador,
      Brigadista: brigadista,
      Formacao_Data: formacaoData,
      Admissao_Data: admissaoData,
      Observacao: observacao
    });
    res.status(200).send({
      lojaSigla,
      universoId,
      tipo,
      nome,
      funcao,
      email,
      administrador,
      brigadista,
      formacaoData
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CriarColaboradorController
});
