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

// src/modules/universos/useCases/listarUniversosPorLoja/listarUniversosPorLojaUsecase.ts
var listarUniversosPorLojaUsecase_exports = {};
__export(listarUniversosPorLojaUsecase_exports, {
  ListarUniversosPorLojaUsecase: () => ListarUniversosPorLojaUsecase
});
module.exports = __toCommonJS(listarUniversosPorLojaUsecase_exports);

// src/shared/errors/AppErros.ts
var AppErrors = class {
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/modules/universos/useCases/listarUniversosPorLoja/listarUniversosPorLojaUsecase.ts
var ListarUniversosPorLojaUsecase = class {
  constructor(universosRepository, lojasRepository) {
    this.universosRepository = universosRepository;
    this.lojasRepository = lojasRepository;
  }
  async execute(nome) {
    const loja = await this.lojasRepository.buscarPorSiglaOuNome(nome);
    if (!loja) {
      throw new AppErrors(`A loja ${loja} n\xE3o est\xE1 registrada no sistema`);
    }
    const universos = await this.universosRepository.buscarUniversosPorLoja(
      loja.Loja_Sigla
    );
    return universos;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ListarUniversosPorLojaUsecase
});
