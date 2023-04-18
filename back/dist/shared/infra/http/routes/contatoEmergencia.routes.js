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

// src/shared/infra/http/routes/contatoEmergencia.routes.ts
var contatoEmergencia_routes_exports = {};
__export(contatoEmergencia_routes_exports, {
  contatosEmergenciaRoutes: () => contatosEmergenciaRoutes
});
module.exports = __toCommonJS(contatoEmergencia_routes_exports);

// src/modules/contatosDeEmergencia/useCases/buscarContatoPorId/buscarContatoPorIdController.ts
var import_zod = require("zod");
async function buscarContatoPorId(req, res) {
  const reqParamsSchema = import_zod.z.object({
    id: import_zod.coerce.number()
  });
  const { id } = reqParamsSchema.parse(req.params);
  const buscarContatoPorIdUsecase = req.diScope.resolve("buscarContatoPorId");
  const contato = await buscarContatoPorIdUsecase.execute(id);
  return res.status(200).send(contato);
}

// src/modules/contatosDeEmergencia/useCases/criarContato/criarContatoDeEmergenciaController.ts
var import_zod2 = require("zod");
async function criarContatoDeEmergencia(req, res) {
  const reqParamsSchema = import_zod2.z.object({
    lojaSigla: import_zod2.z.string(),
    nomeContato: import_zod2.z.string(),
    telefone: import_zod2.z.string(),
    descricao: import_zod2.z.string()
  });
  const criarContatoUseCase = req.diScope.resolve("criarContatoDeEmergencia");
  const { descricao, lojaSigla, nomeContato, telefone } = reqParamsSchema.parse(
    req.body
  );
  const { contato } = await criarContatoUseCase.execute({
    descricao,
    lojaSigla,
    nomeContato,
    telefone
  });
  return res.status(201).send(contato);
}

// src/modules/contatosDeEmergencia/useCases/deletarContato/deletarContatoController.ts
var import_zod3 = require("zod");
async function deletarContato(req, res) {
  const reqParams = import_zod3.z.object({
    id: import_zod3.z.coerce.number()
  });
  const { id } = reqParams.parse(req.params);
  const deletarContatoUseCase = req.diScope.resolve(
    "deletarContatoDeEmergencia"
  );
  await deletarContatoUseCase.execute(id);
  return res.status(200).send("Contato deletado com sucesso");
}

// src/modules/contatosDeEmergencia/useCases/editarContatoDeEmergencia/editarContatosDeEmergenciaController.ts
var import_zod4 = require("zod");
async function editarContatoDeEmergencia(req, res) {
  const reqBodySchema = import_zod4.z.object({
    id: import_zod4.z.coerce.number(),
    contato: import_zod4.z.string(),
    telefone: import_zod4.z.string(),
    descricao: import_zod4.z.string().nullable(),
    endereco: import_zod4.z.string().nullable()
  });
  const editarContatoUseCase = req.diScope.resolve("editarContatoDeEmergencia");
  const { id, descricao, contato, telefone, endereco } = reqBodySchema.parse(
    req.body
  );
  await editarContatoUseCase.execute({
    id,
    descricao,
    contato,
    telefone,
    endereco
  });
  return res.status(201).send("Contato editado com sucesso ");
}

// src/modules/contatosDeEmergencia/useCases/GetContatosPorLoja/BuscarContatosController.ts
var import_zod5 = require("zod");
var BuscarContatosContatosController = class {
  async handle(req, res) {
    const reqParams = import_zod5.z.object({
      sigla: import_zod5.z.string()
    });
    const { sigla } = reqParams.parse(req.params);
    const buscarContatosUseCase = req.diScope.resolve("buscarContatosUsecase");
    const contatos = await buscarContatosUseCase.execute(sigla);
    return res.status(200).send(contatos);
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

// src/shared/infra/http/routes/contatoEmergencia.routes.ts
var buscarContatosController = new BuscarContatosContatosController();
async function contatosEmergenciaRoutes(app) {
  app.get("/:sigla", buscarContatosController.handle);
  app.get("/contato/:id", { onRequest: [verificarJwt] }, buscarContatoPorId);
  app.post("/", { onRequest: [verificarJwt] }, criarContatoDeEmergencia);
  app.delete("/:id", { onRequest: [verificarJwt] }, deletarContato);
  app.put("/", { onRequest: [verificarJwt] }, editarContatoDeEmergencia);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  contatosEmergenciaRoutes
});
