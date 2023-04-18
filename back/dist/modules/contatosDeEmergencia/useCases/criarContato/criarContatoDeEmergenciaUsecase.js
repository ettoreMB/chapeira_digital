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

// src/modules/contatosDeEmergencia/useCases/criarContato/criarContatoDeEmergenciaUsecase.ts
var criarContatoDeEmergenciaUsecase_exports = {};
__export(criarContatoDeEmergenciaUsecase_exports, {
  CriarContatoDeEmergenciaUsecase: () => CriarContatoDeEmergenciaUsecase
});
module.exports = __toCommonJS(criarContatoDeEmergenciaUsecase_exports);

// src/shared/errors/AppErros.ts
var AppErrors = class {
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/modules/contatosDeEmergencia/useCases/criarContato/criarContatoDeEmergenciaUsecase.ts
var CriarContatoDeEmergenciaUsecase = class {
  constructor(contatosEmergenciaRepository) {
    this.contatosEmergenciaRepository = contatosEmergenciaRepository;
  }
  async execute(data) {
    const contatoExiste = await this.contatosEmergenciaRepository.buscarPorNomeELoja(
      data.lojaSigla,
      data.nomeContato
    );
    if (contatoExiste) {
      throw new AppErrors("Contato j\xE1 cadastrado nesta loja", 400);
    }
    const contato = await this.contatosEmergenciaRepository.criar({
      Contato: data.nomeContato,
      Telefone: data.telefone,
      Descricao: data.descricao,
      Loja_Sigla: data.lojaSigla
    });
    return { contato };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CriarContatoDeEmergenciaUsecase
});
