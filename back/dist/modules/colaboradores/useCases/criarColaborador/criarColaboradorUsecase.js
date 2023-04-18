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

// src/modules/colaboradores/useCases/criarColaborador/criarColaboradorUsecase.ts
var criarColaboradorUsecase_exports = {};
__export(criarColaboradorUsecase_exports, {
  CriarColaboradorUsecase: () => CriarColaboradorUsecase
});
module.exports = __toCommonJS(criarColaboradorUsecase_exports);

// src/shared/errors/AppErros.ts
var AppErrors = class {
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/modules/colaboradores/useCases/criarColaborador/criarColaboradorUsecase.ts
var CriarColaboradorUsecase = class {
  constructor(colaboradorRepository) {
    this.colaboradorRepository = colaboradorRepository;
  }
  async execute({
    Loja_Sigla,
    Nome,
    Email,
    Tipo,
    Endereco,
    Telefone,
    Id_Universo,
    Funcao,
    Empresa,
    Administrador,
    Brigadista,
    Formacao_Data,
    Admissao_Data,
    Observacao
  }) {
    const emailExiste = await this.colaboradorRepository.buscarPorEmail(
      String(Email)
    );
    if (emailExiste?.Email === Email && emailExiste.Loja_Sigla === Loja_Sigla) {
      throw new AppErrors("Email j\xE1 cadastrado nesta loja", 400);
    }
    try {
      const colaborador = await this.colaboradorRepository.criar({
        Loja_Sigla,
        Nome,
        Email,
        Tipo,
        Endereco,
        Telefone,
        Id_Universo,
        Funcao,
        Empresa,
        Administrador,
        Brigadista,
        Formacao_Data,
        Admissao_Data,
        Observacao
      });
      return colaborador;
    } catch (error) {
      throw new AppErrors("Erro ao cadastrar colaborador", 500);
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CriarColaboradorUsecase
});
