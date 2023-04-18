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

// src/modules/colaboradores/infra/in-memory/colaboradores-repository-inMemory.ts
var colaboradores_repository_inMemory_exports = {};
__export(colaboradores_repository_inMemory_exports, {
  ColaboradoresRepositoryInMemory: () => ColaboradoresRepositoryInMemory
});
module.exports = __toCommonJS(colaboradores_repository_inMemory_exports);
var import_crypto = require("crypto");
var ColaboradoresRepositoryInMemory = class {
  constructor() {
    this.items = [];
  }
  async buscarPorId(id) {
    const colaborador = this.items.find((colaborador2) => colaborador2.Id === id);
    if (!colaborador) {
      return null;
    }
    const newColaborador = {
      ...colaborador,
      tb_universos: {
        Id: 0,
        Universo: ""
      }
    };
    return newColaborador;
  }
  async buscarPorEmail(email) {
    const colaborador = this.items.find(
      (colaborador2) => colaborador2.Email === email
    );
    if (!colaborador) {
      return null;
    }
    return colaborador;
  }
  async criar(data) {
    const colaborador = {
      Id: Math.floor(Math.random() * 10),
      Acao: "Check In",
      Administrador: data.Administrador,
      Admissao_Data: "",
      Ativo: "Sim",
      Brigadista: "Nao",
      CheckIn: 1,
      CheckIn_Browser: "",
      CheckIn_Date: /* @__PURE__ */ new Date(),
      CheckIn_IP: "",
      CheckIn_Session: "",
      CheckIn_Status: "",
      Cidade: "",
      Cor: "",
      Email: data.Email,
      Empresa: "DECATLHON",
      Endereco: "",
      Formacao_Data: "",
      Funcao: "",
      Funcao_Sigla: "",
      Id_Key: (0, import_crypto.randomUUID)(),
      Id_Universo: data.Id_Universo,
      Insert_Date: "",
      Insert_User: "",
      Jornada_Sigla: "",
      Loja_Sigla: data.Loja_Sigla,
      Nome: data.Nome,
      Observacao: "",
      Qtd_Ativo: 0,
      Qtd_Ausente: 0,
      Qtd_Brigadista: 0,
      Qtd_Colaborador: 0,
      Qtd_Nao_Brigadista: 0,
      Qtd_Presente: 0,
      Qtd_Terceiro: 0,
      Qtd_Visitante: 0,
      Senha: data.Senha,
      Status: "Presente",
      Telefone: "",
      Tipo: "Colaborador",
      UF: "UF",
      Update_Date: "",
      Update_User: ""
    };
    this.items.push(colaborador);
    return colaborador;
  }
  checkIn(id, data) {
    throw new Error("Method not implemented.");
  }
  async listarColaboradoresPorTipoOuUniverso(data) {
    const colaboradores = this.items.filter(
      (colaborador) => colaborador.Id_Universo === data.universoId || colaborador.Tipo === data.tipo
    );
    return colaboradores;
  }
  updateAdmin(id, Administrador) {
    throw new Error("Method not implemented.");
  }
  desativarColaborador(id, data) {
    throw new Error("Method not implemented.");
  }
  informacaoColaboradores(nome) {
    throw new Error("Method not implemented.");
  }
  async editar(data) {
    const colaboradorIndex = this.items.findIndex(
      (colaborador) => colaborador.Id === data.Id
    );
    if (colaboradorIndex >= 0) {
      this.items[colaboradorIndex] = data;
    }
    return data;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ColaboradoresRepositoryInMemory
});
