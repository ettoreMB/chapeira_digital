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

// src/modules/universos/useCases/deletarUniverso/deletarUniversoUsecase.ts
var deletarUniversoUsecase_exports = {};
__export(deletarUniversoUsecase_exports, {
  DeletarUniversoUsecase: () => DeletarUniversoUsecase
});
module.exports = __toCommonJS(deletarUniversoUsecase_exports);

// src/shared/errors/AppErros.ts
var AppErrors = class {
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/modules/universos/useCases/deletarUniverso/deletarUniversoUsecase.ts
var DeletarUniversoUsecase = class {
  constructor(universoRepository, colaboradoresRepository) {
    this.universoRepository = universoRepository;
    this.colaboradoresRepository = colaboradoresRepository;
  }
  async execute(id) {
    const universo = await this.universoRepository.buscarPorId(id);
    if (!universo) {
      throw new AppErrors("universo n\xE3o encontrado", 400);
    }
    const existeColaboradores = await this.colaboradoresRepository.listarColaboradoresPorTipoOuUniverso({
      universoId: universo.Id
    });
    if (existeColaboradores.length > 0) {
      throw new AppErrors("Existem colaboradores nesse universo", 409);
    }
    await this.universoRepository.deletar(universo.Id);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DeletarUniversoUsecase
});
