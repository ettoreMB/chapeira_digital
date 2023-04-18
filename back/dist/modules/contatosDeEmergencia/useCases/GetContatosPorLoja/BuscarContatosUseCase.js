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

// src/modules/contatosDeEmergencia/useCases/GetContatosPorLoja/BuscarContatosUseCase.ts
var BuscarContatosUseCase_exports = {};
__export(BuscarContatosUseCase_exports, {
  BuscarContatosContatosUseCase: () => BuscarContatosContatosUseCase
});
module.exports = __toCommonJS(BuscarContatosUseCase_exports);

// src/shared/errors/AppErros.ts
var AppErrors = class {
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/modules/contatosDeEmergencia/useCases/GetContatosPorLoja/BuscarContatosUseCase.ts
var BuscarContatosContatosUseCase = class {
  constructor(contatosEmergenciaRepository) {
    this.contatosEmergenciaRepository = contatosEmergenciaRepository;
  }
  async execute(sigla) {
    if (!sigla) {
      throw new AppErrors("Sigla da loja inv\xE1lida");
    }
    const contacts = await this.contatosEmergenciaRepository.getAll(sigla);
    return contacts;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BuscarContatosContatosUseCase
});
