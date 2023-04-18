"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/modules/colaboradores/useCases/enviarEmailPerdaSenha/enviarEmailPerdaSenhaUsecase.ts
var enviarEmailPerdaSenhaUsecase_exports = {};
__export(enviarEmailPerdaSenhaUsecase_exports, {
  EnviarEmailPerdaSenhaUsecase: () => EnviarEmailPerdaSenhaUsecase
});
module.exports = __toCommonJS(enviarEmailPerdaSenhaUsecase_exports);

// src/shared/errors/AppErros.ts
var AppErrors = class {
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/modules/colaboradores/useCases/enviarEmailPerdaSenha/enviarEmailPerdaSenhaUsecase.ts
var import_node_path = __toESM(require("path"));
var EnviarEmailPerdaSenhaUsecase = class {
  constructor(colaboradorRepository, lojaRepository, mailProvider) {
    this.colaboradorRepository = colaboradorRepository;
    this.lojaRepository = lojaRepository;
    this.mailProvider = mailProvider;
  }
  async execute(email, lojaSigla, token) {
    const colaborador = await this.colaboradorRepository.buscarPorEmail(email);
    const loja = await this.lojaRepository.buscarPorSiglaOuNome(lojaSigla);
    if (!colaborador) {
      throw new AppErrors("Colaborador n\xE3o encontrado", 404);
    }
    if (colaborador.Administrador === "Nao") {
      throw new AppErrors("N\xE3o autorizado", 401);
    }
    if (lojaSigla.toUpperCase() !== loja?.Pasta_WEB?.toUpperCase() && lojaSigla.toUpperCase() !== loja?.Loja_Sigla.toUpperCase()) {
      throw new AppErrors("Loja n\xE3o encontrada", 404);
    }
    const templatePath = import_node_path.default.resolve("views", "emails", "recuperarSenha.hbs");
    const variaveis = {
      nome: colaborador.Nome,
      token,
      lojaSigla,
      link: `http://localhost:3000/${loja.Pasta_WEB}/recuperarSenha/${token}`
    };
    await this.mailProvider.enviarEmail(
      email,
      "Recupera\xE7\xE3o de senha chapeira digital",
      variaveis,
      templatePath
    );
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EnviarEmailPerdaSenhaUsecase
});
