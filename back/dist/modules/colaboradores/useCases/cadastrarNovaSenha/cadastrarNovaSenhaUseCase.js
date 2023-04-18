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

// src/modules/colaboradores/useCases/cadastrarNovaSenha/cadastrarNovaSenhaUseCase.ts
var cadastrarNovaSenhaUseCase_exports = {};
__export(cadastrarNovaSenhaUseCase_exports, {
  CadastrarNovaSenhaUseCase: () => CadastrarNovaSenhaUseCase
});
module.exports = __toCommonJS(cadastrarNovaSenhaUseCase_exports);

// src/shared/errors/AppErros.ts
var AppErrors = class {
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/modules/colaboradores/useCases/cadastrarNovaSenha/cadastrarNovaSenhaUseCase.ts
var import_fast_jwt = require("fast-jwt");
var CadastrarNovaSenhaUseCase = class {
  constructor(colaboradoresRepository, lojaRepository) {
    this.colaboradoresRepository = colaboradoresRepository;
    this.lojaRepository = lojaRepository;
  }
  async execute(token, senha, lojaSigla) {
    const decoder = (0, import_fast_jwt.createDecoder)();
    const decodedToken = decoder(token);
    const colaborador = await this.colaboradoresRepository.buscarPorEmail(
      decodedToken.sub
    );
    const loja = await this.lojaRepository.buscarPorSiglaOuNome(lojaSigla);
    if (colaborador?.Administrador === "Nao") {
      throw new AppErrors("n\xE3o autorizado", 401);
    }
    if (colaborador?.Loja_Sigla !== lojaSigla) {
      throw new AppErrors("sigla divergente", 401);
    }
    if (loja?.Pasta_WEB?.toUpperCase() !== lojaSigla.toUpperCase()) {
      throw new AppErrors("loja divergente", 402);
    }
    colaborador.Senha = senha;
    await this.colaboradoresRepository.editar(colaborador);
    return colaborador;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CadastrarNovaSenhaUseCase
});
