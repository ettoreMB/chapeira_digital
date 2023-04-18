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

// src/modules/colaboradores/useCases/CheckInCheckout/CheckInOutUsecase.ts
var CheckInOutUsecase_exports = {};
__export(CheckInOutUsecase_exports, {
  CheckInOutUsecase: () => CheckInOutUsecase
});
module.exports = __toCommonJS(CheckInOutUsecase_exports);

// src/shared/errors/AppErros.ts
var AppErrors = class {
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/modules/colaboradores/useCases/CheckInCheckout/CheckInOutUsecase.ts
var CheckInOutUsecase = class {
  constructor(colaboradoresRepository) {
    this.colaboradoresRepository = colaboradoresRepository;
  }
  async execute(id, ip, browser) {
    const colaborador = await this.colaboradoresRepository.buscarPorId(id);
    if (!colaborador) {
      throw new AppErrors("colaborador n\xE3o encontrado", 404);
    }
    if (colaborador.Ativo === "Nao") {
      throw new AppErrors("este colaborador n\xE3o est\xE1 ativo", 404);
    }
    const data = {
      checkIn: colaborador.CheckIn === 1 ? colaborador.CheckIn = 0 : colaborador.CheckIn = 1,
      status: colaborador.Status === "Presente" ? colaborador.Status = "Presente" : colaborador.Status = "Ausente",
      checkInStatus: colaborador.CheckIn_Status === "Presente" ? colaborador.CheckIn_Status = "Presente" : colaborador.CheckIn_Status = "Ausente",
      acao: colaborador.Acao === "Chek Out" ? colaborador.Acao = "Chek In" : colaborador.Acao = "Chek Out",
      cor: colaborador.Cor === "success" ? colaborador.Cor = "success" : colaborador.Cor = "Danger",
      checkInDate: /* @__PURE__ */ new Date(),
      ip,
      browser
    };
    await this.colaboradoresRepository.checkIn(id, data);
    const output = {
      nome: colaborador.Nome,
      acao: colaborador.Acao,
      data: colaborador.CheckIn_Date,
      status: colaborador.Status,
      universo: colaborador.tb_universos?.Universo
    };
    return output;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CheckInOutUsecase
});
