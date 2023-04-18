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

// src/modules/colaboradores/useCases/buscarPorId/buscarColaboradorPorIdUseCase.ts
var buscarColaboradorPorIdUseCase_exports = {};
__export(buscarColaboradorPorIdUseCase_exports, {
  BuscarColaboradorPorIdUseCase: () => BuscarColaboradorPorIdUseCase
});
module.exports = __toCommonJS(buscarColaboradorPorIdUseCase_exports);

// src/shared/errors/AppErros.ts
var AppErrors = class {
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/modules/colaboradores/useCases/buscarPorId/buscarColaboradorPorIdUseCase.ts
var BuscarColaboradorPorIdUseCase = class {
  constructor(colaboradorRepository) {
    this.colaboradorRepository = colaboradorRepository;
  }
  async execute(id) {
    const colaborador = await this.colaboradorRepository.buscarPorId(id);
    if (!colaborador) {
      throw new AppErrors("Colaborador n\xE3o encontrado", 404);
    }
    const response = {
      id: colaborador.Id,
      nome: colaborador.Nome,
      universo: colaborador.tb_universos?.Universo,
      idUniverso: colaborador.Id_Universo,
      email: colaborador.Email,
      telefone: colaborador.Telefone,
      endereco: colaborador.Endereco,
      tipo: colaborador.Tipo,
      empresa: colaborador.Empresa,
      brigadista: colaborador.Brigadista,
      formacaoData: colaborador.Formacao_Data,
      admissaoData: colaborador.Admissao_Data,
      observacao: colaborador.Observacao,
      administrador: colaborador.Administrador
    };
    return response;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BuscarColaboradorPorIdUseCase
});
