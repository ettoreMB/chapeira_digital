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

// src/modules/universos/infra/in-memory/universos-repository-inMemory.ts
var universos_repository_inMemory_exports = {};
__export(universos_repository_inMemory_exports, {
  UniversosRepositoryInMemory: () => UniversosRepositoryInMemory
});
module.exports = __toCommonJS(universos_repository_inMemory_exports);
var import_crypto = require("crypto");
var UniversosRepositoryInMemory = class {
  constructor() {
    this.items = [];
  }
  async criar(data) {
    const universo = {
      Id: Math.floor(Math.random() * 100),
      Id_Key: (0, import_crypto.randomUUID)(),
      Loja_Sigla: data.Loja_Sigla,
      Zona: data.Zona,
      Andar: data.Andar,
      Universo: data.Universo,
      Insert_Date: /* @__PURE__ */ new Date(),
      Insert_User: "",
      Update_Date: /* @__PURE__ */ new Date(),
      Update_User: ""
    };
    this.items.push(universo);
    return universo;
  }
  async buscarUniversosPorLoja(sigla) {
    const universos = this.items.filter(
      (universo) => universo.Loja_Sigla === sigla
    );
    return universos;
  }
  async buscarUniversoPorNomeELoja(nome, lojaSigla) {
    const universo = this.items.find(
      (universo2) => universo2.Universo === nome && universo2.Loja_Sigla === lojaSigla
    );
    if (!universo) {
      return null;
    }
    return universo;
  }
  async editar(data) {
    const universoIndex = this.items.findIndex(
      (universo) => universo.Id === data.Id
    );
    if (universoIndex >= 0) {
      this.items[universoIndex] = data;
    }
    return data;
  }
  async buscarPorId(id) {
    const universo = await this.items.find((universo2) => universo2.Id === id);
    if (!universo) {
      return null;
    }
    return universo;
  }
  async deletar(id) {
    this.items = this.items.filter((universo) => universo.Id !== id);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UniversosRepositoryInMemory
});
