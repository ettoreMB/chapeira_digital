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

// src/modules/colaboradores/useCases/listarColaboradoresPorLoja/listarColaboradoresUseCase.ts
var listarColaboradoresUseCase_exports = {};
__export(listarColaboradoresUseCase_exports, {
  ListarColaboradoresUseCase: () => ListarColaboradoresUseCase
});
module.exports = __toCommonJS(listarColaboradoresUseCase_exports);

// src/shared/errors/AppErros.ts
var AppErrors = class {
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/modules/colaboradores/useCases/listarColaboradoresPorLoja/listarColaboradoresUseCase.ts
var ListarColaboradoresUseCase = class {
  constructor(colaboradoresRepository, lojaRepository) {
    this.colaboradoresRepository = colaboradoresRepository;
    this.lojaRepository = lojaRepository;
  }
  async execute({ nome, universoId, tipo }) {
    const loja = await this.lojaRepository.buscarPorSiglaOuNome(nome);
    if (!loja) {
      throw new AppErrors("Loja nao encontrada no sistema", 404);
    }
    const colaboradores = await this.colaboradoresRepository.listarColaboradoresPorTipoOuUniverso({
      sigla: loja.Loja_Sigla,
      tipo: tipo || null,
      universoId: universoId || null
    });
    return colaboradores;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ListarColaboradoresUseCase
});
