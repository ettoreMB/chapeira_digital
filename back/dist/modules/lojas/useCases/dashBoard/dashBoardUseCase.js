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

// src/modules/lojas/useCases/dashBoard/dashBoardUseCase.ts
var dashBoardUseCase_exports = {};
__export(dashBoardUseCase_exports, {
  DashBoardUsecase: () => DashBoardUsecase
});
module.exports = __toCommonJS(dashBoardUseCase_exports);

// src/shared/errors/AppErros.ts
var AppErrors = class {
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/modules/lojas/useCases/dashBoard/dashBoardUseCase.ts
var DashBoardUsecase = class {
  constructor(lojasRepository) {
    this.lojasRepository = lojasRepository;
  }
  async execute(loja) {
    const lojaExiste = await this.lojasRepository.buscarPorSiglaOuNome(loja);
    if (!lojaExiste) {
      throw new AppErrors("Loja n\xE3o encontrada no sistema", 404);
    }
    const dados = await this.lojasRepository.dashBoard(lojaExiste.Loja_Sigla);
    return { dados };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DashBoardUsecase
});
