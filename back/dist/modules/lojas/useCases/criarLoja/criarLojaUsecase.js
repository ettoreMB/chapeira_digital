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

// src/modules/lojas/useCases/criarLoja/criarLojaUsecase.ts
var criarLojaUsecase_exports = {};
__export(criarLojaUsecase_exports, {
  CriarLojaUsecase: () => CriarLojaUsecase
});
module.exports = __toCommonJS(criarLojaUsecase_exports);

// src/shared/errors/AppErros.ts
var AppErrors = class {
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/modules/lojas/useCases/criarLoja/criarLojaUsecase.ts
var CriarLojaUsecase = class {
  constructor(lojasRepository, cidadesRepository, colaboradorRepository, universosRepository) {
    this.lojasRepository = lojasRepository;
    this.cidadesRepository = cidadesRepository;
    this.colaboradorRepository = colaboradorRepository;
    this.universosRepository = universosRepository;
  }
  async execute(data) {
    const siglaExiste = await this.lojasRepository.buscarPorSiglaOuNome(
      data.Loja_Sigla
    );
    if (siglaExiste) {
      throw new AppErrors("Sigla j\xE1 cadastrada no sistema");
    }
    const cnpjExiste = await this.lojasRepository.buscarPorCnpj(data.CNPJ);
    if (cnpjExiste) {
      throw new AppErrors("CNPJ J\xE1 cadastrado");
    }
    const cidadeExiste = await this.cidadesRepository.buscarPorCidade(
      data.Loja_Cidade
    );
    if (!cidadeExiste) {
      await this.cidadesRepository.criar({
        cidade: data.Loja_Cidade,
        estadoSigla: data.Loja_UF
      });
    }
    const loja = await this.lojasRepository.criar({
      CNPJ: data.CNPJ,
      Loja: data.Loja,
      Loja_Endereco: data.Loja_Endereco,
      Responsavel: data.Responsavel,
      Loja_Cidade: data.Loja_Cidade,
      Loja_Sigla: data.Loja_Sigla,
      Loja_Telefone: data.Loja_Telefone,
      Loja_UF: data.Loja_UF,
      Responsavel_Email: data.Responsavel_Email,
      Responsavel_Telefone: data.Responsavel_Telefone
    });
    const universo = await this.universosRepository.criar({
      Loja_Sigla: data.Loja_Sigla,
      Andar: "0",
      Zona: "0",
      Universo: "ADM"
    });
    await this.colaboradorRepository.criar({
      Loja_Sigla: data.Loja_Sigla,
      Administrador: "Sim",
      Email: data.Responsavel_Email,
      Brigadista: "Nao",
      Formacao_Data: "",
      Funcao: "Administrador",
      Id_Universo: universo.Id,
      Nome: data.Responsavel,
      Senha: "chapeira@chapeira",
      Observacao: "",
      Admissao_Data: "",
      Empresa: "DECATHLON",
      Endereco: "",
      Telefone: "",
      Tipo: "Colaborador"
    });
    return loja;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CriarLojaUsecase
});
