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

// src/modules/colaboradores/useCases/editarColaborador/editarColaboradorUseCase.ts
var editarColaboradorUseCase_exports = {};
__export(editarColaboradorUseCase_exports, {
  EditarColaboradorUseCase: () => EditarColaboradorUseCase
});
module.exports = __toCommonJS(editarColaboradorUseCase_exports);

// src/shared/errors/AppErros.ts
var AppErrors = class {
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/modules/colaboradores/useCases/editarColaborador/editarColaboradorUseCase.ts
var EditarColaboradorUseCase = class {
  constructor(colabotadoresRepository) {
    this.colabotadoresRepository = colabotadoresRepository;
  }
  async execute(data) {
    const colaborador = await this.colabotadoresRepository.buscarPorId(data.id);
    if (!colaborador) {
      throw new AppErrors("Colaborador n\xE3o encontrado", 404);
    }
    colaborador.Nome = data.nome;
    colaborador.Administrador = data.admin;
    colaborador.Id_Universo = data.universoId;
    colaborador.Brigadista = data.brigadista;
    colaborador.Formacao_Data = data.formacao;
    colaborador.Admissao_Data = data.admissao;
    colaborador.Email = data.email;
    colaborador.Telefone = data.telefone;
    colaborador.Funcao = data.funcao;
    colaborador.Endereco = data.endereco;
    colaborador.Observacao = data.observacao;
    colaborador.Empresa = data.empresa;
    try {
      await this.colabotadoresRepository.editar(colaborador);
      return colaborador;
    } catch (error) {
      throw new AppErrors("Erro ao editar usu\xE1rio");
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EditarColaboradorUseCase
});
