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

// src/modules/universos/useCases/criarUniverso/criarUniversoUsecase.ts
var criarUniversoUsecase_exports = {};
__export(criarUniversoUsecase_exports, {
  CriarUniversoUsecase: () => CriarUniversoUsecase
});
module.exports = __toCommonJS(criarUniversoUsecase_exports);

// src/shared/errors/AppErros.ts
var AppErrors = class {
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/modules/universos/useCases/criarUniverso/criarUniversoUsecase.ts
var CriarUniversoUsecase = class {
  constructor(universoRepository) {
    this.universoRepository = universoRepository;
  }
  async execute(data) {
    const universoExiste = await this.universoRepository.buscarUniversoPorNomeELoja(
      data.Universo,
      data.Loja_Sigla
    );
    if (universoExiste) {
      throw new AppErrors("Universo j\xE1 cadastrado nesta loja", 409);
    }
    const universo = await this.universoRepository.criar({
      Loja_Sigla: data.Loja_Sigla,
      Universo: data.Universo,
      Zona: data.Zona,
      Andar: data.Andar
    });
    return { universo };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CriarUniversoUsecase
});
