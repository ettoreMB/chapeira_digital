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

// src/modules/universos/useCases/editarUniverso/editarUniversoUsecase.ts
var editarUniversoUsecase_exports = {};
__export(editarUniversoUsecase_exports, {
  EditarUniversoUsecase: () => EditarUniversoUsecase
});
module.exports = __toCommonJS(editarUniversoUsecase_exports);

// src/shared/errors/AppErros.ts
var AppErrors = class {
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/modules/universos/useCases/editarUniverso/editarUniversoUsecase.ts
var EditarUniversoUsecase = class {
  constructor(universosRepository) {
    this.universosRepository = universosRepository;
  }
  async execute({
    id,
    Universo,
    Zona,
    Andar
  }) {
    const universo = await this.universosRepository.buscarPorId(id);
    if (!universo) {
      throw new AppErrors("Universo n\xE3o encontrado", 404);
    }
    universo.Universo = Universo;
    universo.Zona = Zona;
    universo.Andar = Andar;
    await this.universosRepository.editar(universo);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EditarUniversoUsecase
});
