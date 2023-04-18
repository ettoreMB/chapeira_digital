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

// src/modules/lojas/useCases/buscarLojaPorSiglaOuNome/buscarLojaPorSiglaOuNomeUsecase.ts
var buscarLojaPorSiglaOuNomeUsecase_exports = {};
__export(buscarLojaPorSiglaOuNomeUsecase_exports, {
  BuscarLojaPorSiglaOuNomeUsecase: () => BuscarLojaPorSiglaOuNomeUsecase
});
module.exports = __toCommonJS(buscarLojaPorSiglaOuNomeUsecase_exports);

// src/shared/errors/AppErros.ts
var AppErrors = class {
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/modules/lojas/useCases/buscarLojaPorSiglaOuNome/buscarLojaPorSiglaOuNomeUsecase.ts
var BuscarLojaPorSiglaOuNomeUsecase = class {
  constructor(lojasRepository) {
    this.lojasRepository = lojasRepository;
  }
  async execute(sigla) {
    const loja = await this.lojasRepository.buscarPorSiglaOuNome(sigla);
    if (!loja) {
      throw new AppErrors("Loja n\xE3o encontrada no sistema", 404);
    }
    const resposta = {
      id: loja.Id,
      ativo: loja?.Ativo,
      loja: loja?.Loja,
      sigla: loja?.Loja_Sigla,
      pastaWEB: loja?.Pasta_WEB,
      URL: loja?.URL,
      cidade: loja?.Loja_Cidade,
      endereco: loja?.Loja_Endereco,
      telefone: loja?.Loja_Telefone,
      UF: loja?.Loja_UF,
      horario: loja.Loja_Horario,
      responsavel: loja?.Responsavel,
      responsavelEmail: loja?.Responsavel_Email,
      responsavelTelefone: loja?.Responsavel_Telefone
    };
    return resposta;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BuscarLojaPorSiglaOuNomeUsecase
});
