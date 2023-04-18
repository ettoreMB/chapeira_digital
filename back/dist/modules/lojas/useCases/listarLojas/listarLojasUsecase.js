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

// src/modules/lojas/useCases/listarLojas/listarLojasUsecase.ts
var listarLojasUsecase_exports = {};
__export(listarLojasUsecase_exports, {
  ListarLojasUsecase: () => ListarLojasUsecase
});
module.exports = __toCommonJS(listarLojasUsecase_exports);

// src/shared/errors/AppErros.ts
var AppErrors = class {
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/modules/lojas/useCases/listarLojas/listarLojasUsecase.ts
var ListarLojasUsecase = class {
  constructor(lojasRepository) {
    this.lojasRepository = lojasRepository;
  }
  async execute() {
    try {
      const lojas = await this.lojasRepository.listar();
      const lojasDto = lojas.map((loja) => {
        const response = {
          ativo: loja.Ativo,
          loja: loja.Loja,
          sigla: loja.Loja_Sigla,
          pastaWEB: loja.Pasta_WEB,
          cidade: loja.Loja_Cidade,
          endereco: loja.Loja_Endereco,
          UF: loja.Loja_UF,
          responsavel: loja.Responsavel,
          responsavelEmail: loja.Responsavel_Email,
          responsavelTelefone: loja.Responsavel_Telefone
        };
        return response;
      });
      return lojasDto;
    } catch (error) {
      console.error(error);
      throw new AppErrors("Erro ao listar as lojas", 500);
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ListarLojasUsecase
});
