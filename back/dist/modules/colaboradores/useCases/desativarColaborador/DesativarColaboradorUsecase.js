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

// src/modules/colaboradores/useCases/desativarColaborador/DesativarColaboradorUsecase.ts
var DesativarColaboradorUsecase_exports = {};
__export(DesativarColaboradorUsecase_exports, {
  DesativarColaboradorUsecase: () => DesativarColaboradorUsecase
});
module.exports = __toCommonJS(DesativarColaboradorUsecase_exports);

// src/shared/errors/AppErros.ts
var AppErrors = class {
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/modules/colaboradores/useCases/desativarColaborador/DesativarColaboradorUsecase.ts
var DesativarColaboradorUsecase = class {
  constructor(colaboradorRepository) {
    this.colaboradorRepository = colaboradorRepository;
  }
  async execute(id) {
    const colaborador = await this.colaboradorRepository.buscarPorId(id);
    if (!colaborador) {
      throw new AppErrors("colaborador n\xE3o encontrado", 404);
    }
    try {
      const data = {
        Ativo: "Nao",
        Id_Universo: null,
        Administrador: "Nao",
        CheckIn: 0,
        Status: colaborador.Status === "Presente" ? "Presente" : "Presente",
        CheckIn_Status: colaborador.Status === "Presente" ? "Presente" : "Presente",
        Senha: "AcessoBloqueado",
        Acao: "Check In",
        Cor: "danger"
      };
      await this.colaboradorRepository.desativarColaborador(
        colaborador.Id,
        data
      );
    } catch (error) {
      console.error(error);
      throw new AppErrors("Erro ao desativar o colaborador", 500);
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DesativarColaboradorUsecase
});
