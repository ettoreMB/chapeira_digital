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

// src/modules/cidades/infra/in-memory/cidades-repository-inMemory.ts
var cidades_repository_inMemory_exports = {};
__export(cidades_repository_inMemory_exports, {
  CidadeRepositoryInMemory: () => CidadeRepositoryInMemory
});
module.exports = __toCommonJS(cidades_repository_inMemory_exports);
var CidadeRepositoryInMemory = class {
  constructor() {
    this.items = [];
  }
  async criar(data) {
    const cidade = {
      Id: Math.random(),
      Pais_Sigla: "BR",
      Estado_Sigla: data.estadoSigla,
      Cidade: data.cidade,
      Insert_Date: /* @__PURE__ */ new Date(),
      Insert_User: "",
      Update_Date: /* @__PURE__ */ new Date(),
      Update_User: ""
    };
    this.items.push(cidade);
  }
  async buscarPorCidade(cidade) {
    const resultado = this.items.find((item) => item.Cidade === cidade);
    if (!resultado) {
      return null;
    }
    return resultado;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CidadeRepositoryInMemory
});
