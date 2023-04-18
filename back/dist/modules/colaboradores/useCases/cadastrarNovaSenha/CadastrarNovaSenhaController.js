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

// src/modules/colaboradores/useCases/cadastrarNovaSenha/CadastrarNovaSenhaController.ts
var CadastrarNovaSenhaController_exports = {};
__export(CadastrarNovaSenhaController_exports, {
  cadastrarNovaSenha: () => cadastrarNovaSenha
});
module.exports = __toCommonJS(CadastrarNovaSenhaController_exports);
var import_zod = require("zod");
async function cadastrarNovaSenha(req, res) {
  const reqParamsSchema = import_zod.z.object({
    loja: import_zod.z.string()
  });
  const reqBodySchema = import_zod.z.object({
    token: import_zod.z.string(),
    senha: import_zod.z.string()
  });
  const { loja } = reqParamsSchema.parse(req.params);
  const { token, senha } = reqBodySchema.parse(req.body);
  const cadastrarNovaSenhaUsecase = req.diScope.resolve(
    "cadastrarNovaSenhaUsecase"
  );
  await cadastrarNovaSenhaUsecase.execute(token, senha, loja);
  return res.status(200).send("nova senha registrada com sucesso");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  cadastrarNovaSenha
});
