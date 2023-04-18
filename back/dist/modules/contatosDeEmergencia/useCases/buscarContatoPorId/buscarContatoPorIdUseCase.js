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

// src/modules/contatosDeEmergencia/useCases/buscarContatoPorId/buscarContatoPorIdUseCase.ts
var buscarContatoPorIdUseCase_exports = {};
__export(buscarContatoPorIdUseCase_exports, {
  BuscarContatoPorIdUseCase: () => BuscarContatoPorIdUseCase
});
module.exports = __toCommonJS(buscarContatoPorIdUseCase_exports);

// src/shared/errors/AppErros.ts
var AppErrors = class {
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/modules/contatosDeEmergencia/useCases/buscarContatoPorId/buscarContatoPorIdUseCase.ts
var BuscarContatoPorIdUseCase = class {
  constructor(contatosDeEmergencia) {
    this.contatosDeEmergencia = contatosDeEmergencia;
  }
  async execute(id) {
    const contato = await this.contatosDeEmergencia.buscarPorId(id);
    if (!contato) {
      throw new AppErrors("Contato n\xE3o encontrado", 404);
    }
    return contato;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BuscarContatoPorIdUseCase
});
