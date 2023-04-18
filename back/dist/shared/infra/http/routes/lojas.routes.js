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

// src/shared/infra/http/routes/lojas.routes.ts
var lojas_routes_exports = {};
__export(lojas_routes_exports, {
  lojasRoutes: () => lojasRoutes
});
module.exports = __toCommonJS(lojas_routes_exports);

// src/modules/lojas/useCases/buscarLojaPorSiglaOuNome/buscarLojaPorSiglaOuNomeController.ts
var import_zod = require("zod");
var BuscarLojaPorSiglaOuNomeController = class {
  async handle(req, res) {
    const reqParams = import_zod.z.object({
      sigla: import_zod.z.string()
    });
    const { sigla } = reqParams.parse(req.params);
    const buscarLojasPorSiglaOuNomeUsecase = req.diScope.resolve(
      "buscarLojaPorSiglaOuNome"
    );
    const loja = await buscarLojasPorSiglaOuNomeUsecase.execute(sigla);
    return res.status(200).send(loja);
  }
};

// src/shared/errors/AppErros.ts
var AppErrors = class {
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/modules/lojas/useCases/criarLoja/criarLojaController.ts
var import_zod2 = require("zod");
var CriarLojaController = class {
  async handle(req, res) {
    const reqBodySchema = import_zod2.z.object({
      Loja_Sigla: import_zod2.z.string(),
      Loja: import_zod2.z.string(),
      Loja_Endereco: import_zod2.z.string(),
      Loja_Cidade: import_zod2.z.string(),
      Loja_UF: import_zod2.z.string(),
      Loja_Telefone: import_zod2.z.string().nullable(),
      Responsavel: import_zod2.z.string(),
      Responsavel_Email: import_zod2.z.string().email(),
      Responsavel_Telefone: import_zod2.z.string(),
      CNPJ: import_zod2.z.coerce.number()
    });
    const data = reqBodySchema.parse(req.body);
    const criarLojaUseCase = req.diScope.resolve("criarLojaUseCase");
    try {
      await criarLojaUseCase.execute(data);
    } catch (error) {
      if (error instanceof AppErrors) {
        return res.status(409).send({ message: error.message });
      }
      throw error;
    }
    return res.status(200).send();
  }
};

// src/modules/lojas/useCases/dashBoard/dashBoardController.ts
var import_zod3 = require("zod");
async function dashBoardController(req, res) {
  const ReqParamsSchema = import_zod3.z.object({
    nome: import_zod3.z.string()
  });
  const { nome } = ReqParamsSchema.parse(req.params);
  const dashBoardUsecase = req.diScope.resolve("dashBoardUsecase");
  const { dados } = await dashBoardUsecase.execute(nome);
  return res.status(200).send(dados);
}

// src/modules/lojas/useCases/editarLoja/editarLojaController.ts
var import_zod4 = require("zod");
async function editarLoja(req, res) {
  const reqParamSchema = import_zod4.z.object({
    id: import_zod4.coerce.number()
  });
  const reqBodySchema = import_zod4.z.object({
    endereco: import_zod4.z.string(),
    telefone: import_zod4.z.string().nullable(),
    cidade: import_zod4.z.string(),
    horario: import_zod4.z.string().nullable()
  });
  const { id } = reqParamSchema.parse(req.params);
  const { cidade, endereco, horario, telefone } = reqBodySchema.parse(req.body);
  const editarLojaUsecase = req.diScope.resolve("editarLojaUsecase");
  await editarLojaUsecase.execute(id, {
    Loja_Endereco: endereco,
    Loja_Horario: horario,
    Loja_Telefone: telefone,
    Loja_Cidade: cidade
  });
  return res.status(200).send();
}

// src/modules/lojas/useCases/listarLojas/listarLojasController.ts
var ListarLojasController = class {
  async handle(req, res) {
    const listarLojasUsecase = req.diScope.resolve("listarLojasUseCase");
    const lojas = await listarLojasUsecase.execute();
    return res.status(200).send(lojas);
  }
};

// src/shared/middlewares/verificarJwt.ts
async function verificarJwt(req, res) {
  try {
    await req.jwtVerify();
  } catch (error) {
    return res.status(401).send({ message: "N\xE3o autorizado." });
  }
}

// src/shared/infra/http/routes/lojas.routes.ts
var listarLojasController = new ListarLojasController();
var buscarLojaPorSiglaOuNome = new BuscarLojaPorSiglaOuNomeController();
var criarLojaController = new CriarLojaController();
async function lojasRoutes(app) {
  app.post("/criar", criarLojaController.handle);
  app.get("/listar", listarLojasController.handle);
  app.get("/dashBoard/:nome", dashBoardController);
  app.get("/sigla/:sigla", buscarLojaPorSiglaOuNome.handle);
  app.put("/editar/:id", { onRequest: [verificarJwt] }, editarLoja);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  lojasRoutes
});
