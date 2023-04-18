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

// src/modules/lojas/useCases/editarLoja/editarLojaUsecase.ts
var editarLojaUsecase_exports = {};
__export(editarLojaUsecase_exports, {
  EditarLojaUsecase: () => EditarLojaUsecase
});
module.exports = __toCommonJS(editarLojaUsecase_exports);

// src/modules/lojas/errors/lojaNaoEcontradaErro.ts
var LojaNaoEncontradaErro = class extends Error {
  constructor() {
    super("Loja n\xE3o encontrada no sistema");
  }
};

// src/modules/lojas/useCases/editarLoja/editarLojaUsecase.ts
var EditarLojaUsecase = class {
  constructor(lojaRepository) {
    this.lojaRepository = lojaRepository;
  }
  async execute(id, { Loja_Endereco, Loja_Telefone, Loja_Horario, Loja_Cidade }) {
    const loja = await this.lojaRepository.buscarPorId(id);
    if (!loja) {
      throw new LojaNaoEncontradaErro();
    }
    loja.Loja_Endereco = Loja_Endereco;
    loja.Loja_Telefone = Loja_Telefone;
    loja.Loja_Horario = Loja_Horario;
    loja.Loja_Cidade = Loja_Cidade;
    await this.lojaRepository.editar(loja);
    return loja;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EditarLojaUsecase
});
