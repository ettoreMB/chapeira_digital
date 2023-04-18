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

// src/modules/colaboradores/useCases/auth/authUseCase.ts
var authUseCase_exports = {};
__export(authUseCase_exports, {
  AuthUsecase: () => AuthUsecase
});
module.exports = __toCommonJS(authUseCase_exports);

// src/shared/errors/AppErros.ts
var AppErrors = class {
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/modules/colaboradores/useCases/auth/authUseCase.ts
var AuthUsecase = class {
  constructor(colaboradorRepository) {
    this.colaboradorRepository = colaboradorRepository;
  }
  async execute(email, senha) {
    const admin = await this.colaboradorRepository.buscarPorEmail(email);
    if (!admin) {
      throw new AppErrors("Email ou senha invalidos", 401);
    }
    if (admin.Senha !== senha) {
      throw new AppErrors("Email ou senha invalidos", 401);
    }
    if (admin.Administrador !== "Sim") {
      throw new AppErrors("N\xE3o", 401);
    }
    return admin;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthUsecase
});
