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

// src/modules/contatosDeEmergencia/infra/in-memory/InMemoryContatosDeEmergenciaRepository.ts
var InMemoryContatosDeEmergenciaRepository_exports = {};
__export(InMemoryContatosDeEmergenciaRepository_exports, {
  InMemoryContatosDeEmergenciaRepository: () => InMemoryContatosDeEmergenciaRepository
});
module.exports = __toCommonJS(InMemoryContatosDeEmergenciaRepository_exports);
var InMemoryContatosDeEmergenciaRepository = class {
  constructor() {
    this.items = [];
  }
  async editar(data) {
    const contatoIndex = this.items.findIndex(
      (contato) => contato.Id === data.Id
    );
    if (contatoIndex >= 0) {
      this.items[contatoIndex] = data;
    }
    return data;
  }
  async buscarPorId(id) {
    const contato = this.items.find((contato2) => contato2.Id === id);
    if (!contato) {
      return null;
    }
    return contato;
  }
  async getAll(sigla) {
    return this.items.filter((contato) => contato.Loja_Sigla === sigla);
  }
  async criar(data) {
    const contato = {
      Id: Math.floor(Math.random() * 10),
      Contato: data.Contato ? data.Contato : null,
      Descricao: data.Descricao ? data.Descricao : null,
      Endereco: data.Endereco ? data.Endereco : null,
      Insert_Date: data.Insert_Date ? new Date(data.Insert_Date) : null,
      Loja_Sigla: data.Loja_Sigla ? data.Loja_Sigla : null,
      Telefone: data.Telefone ? data.Telefone : null,
      Insert_User: data.Insert_User ? data.Insert_User : null,
      Update_Date: data.Update_Date ? new Date(data.Update_Date) : null,
      Update_User: data.Update_User ? data.Update_User : null
    };
    this.items.push(contato);
    return contato;
  }
  async buscarPorNomeELoja(lojaSigla, nome) {
    const contato = this.items.find(
      (contato2) => contato2.Contato === nome && contato2.Loja_Sigla === lojaSigla
    );
    if (!contato) {
      return null;
    }
    return contato;
  }
  async deletar(id) {
    this.items = this.items.filter((contato) => contato.Id !== id);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InMemoryContatosDeEmergenciaRepository
});
