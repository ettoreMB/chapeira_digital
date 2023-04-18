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

// src/modules/lojas/infra/in-memory/lojas-repository-in-memory.ts
var lojas_repository_in_memory_exports = {};
__export(lojas_repository_in_memory_exports, {
  LojasRepositoryInMemory: () => LojasRepositoryInMemory
});
module.exports = __toCommonJS(lojas_repository_in_memory_exports);
var import_runtime = require("@prisma/client/runtime");
var LojasRepositoryInMemory = class {
  constructor() {
    this.items = [];
  }
  async buscarPorCnpj(cnpj) {
    const loja = this.items.find((item) => item.CNPJ === cnpj);
    if (!loja) {
      return null;
    }
    return loja;
  }
  async dashBoard(sigla) {
    throw new Error("Method not implemented.");
  }
  async criar(data) {
    const loja = {
      Id: Math.floor(Math.random()),
      Ativo: "Sim",
      Loja_Sigla: data.Loja_Sigla,
      Razao_Social: "razao-social-teste",
      Loja: data.Loja,
      Loja_Endereco: data.Loja_Endereco,
      Loja_Telefone: data.Loja_Telefone,
      Loja_Horario: "123",
      Loja_Grupo: "",
      EPLANNER: false,
      E_Planner: "",
      Responsavel: data.Responsavel,
      Responsavel_Email: data.Responsavel_Email,
      Responsavel_Telefone: data.Responsavel_Telefone,
      Faturamento_Responsavel: data.Responsavel,
      Faturamento_Email: data.Responsavel_Email,
      Faturamento_Telefone: data.Responsavel_Telefone,
      Adm_Email: data.Responsavel_Email,
      Adm_Senha: "123",
      Pasta_WEB: `${data.Loja_UF}-${data.Loja}`,
      URL: `http://chapeira.com.br/${data.Loja_UF}-${data.Loja}`,
      Faturamento_Inicio: /* @__PURE__ */ new Date(),
      Faturar: true,
      CNPJ: data.CNPJ,
      Inscricao_Estadual: "",
      Tablets: new import_runtime.Decimal(2),
      Insert_Date: /* @__PURE__ */ new Date(),
      Insert_User: "",
      Update_Date: /* @__PURE__ */ new Date(),
      Update_User: "",
      Loja_Cidade: data.Loja_Cidade,
      Loja_Pais_Sigla: "BR",
      Loja_UF: "sp"
    };
    this.items.push(loja);
    return loja;
  }
  async editar(data) {
    const lojaIndex = this.items.findIndex((loja) => loja.Id === data.Id);
    if (lojaIndex >= 0) {
      this.items[lojaIndex] = data;
    }
    return data;
  }
  async deletar(id) {
    throw new Error("Method not implemented.");
  }
  buscarPorNome(loja) {
    throw new Error("Method not implemented.");
  }
  async buscarPorSiglaOuNome(lojaSigla) {
    const loja = this.items.find(
      (item) => item.Loja_Sigla === lojaSigla || item.Pasta_WEB === lojaSigla
    );
    if (!loja) {
      return null;
    }
    return loja;
  }
  async buscarPorId(id) {
    const loja = this.items.find((item) => item.Id === id);
    if (!loja) {
      return null;
    }
    return loja;
  }
  listar() {
    throw new Error("Method not implemented.");
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LojasRepositoryInMemory
});
