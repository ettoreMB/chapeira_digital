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

// src/modules/contatosDeEmergencia/useCases/editarContatoDeEmergencia/editarContatoDeEmergenciaUsecase.ts
var editarContatoDeEmergenciaUsecase_exports = {};
__export(editarContatoDeEmergenciaUsecase_exports, {
  EditarContatoDeEmergenciaUsecase: () => EditarContatoDeEmergenciaUsecase
});
module.exports = __toCommonJS(editarContatoDeEmergenciaUsecase_exports);

// src/shared/errors/AppErros.ts
var AppErrors = class {
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/modules/contatosDeEmergencia/useCases/editarContatoDeEmergencia/editarContatoDeEmergenciaUsecase.ts
var EditarContatoDeEmergenciaUsecase = class {
  constructor(contatosDeEmergenciaRepository) {
    this.contatosDeEmergenciaRepository = contatosDeEmergenciaRepository;
  }
  async execute(data) {
    const contato = await this.contatosDeEmergenciaRepository.buscarPorId(
      data.id
    );
    if (!contato) {
      throw new AppErrors("Contato n\xE3o encontrado", 404);
    }
    contato.Contato = data.contato;
    contato.Descricao = data.descricao;
    contato.Telefone = data.telefone;
    contato.Endereco = data.endereco;
    await this.contatosDeEmergenciaRepository.editar(contato);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EditarContatoDeEmergenciaUsecase
});
