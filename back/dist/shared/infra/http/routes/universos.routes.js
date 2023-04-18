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

// src/shared/infra/http/routes/universos.routes.ts
var universos_routes_exports = {};
__export(universos_routes_exports, {
  UniversosRoutes: () => UniversosRoutes
});
module.exports = __toCommonJS(universos_routes_exports);

// src/modules/universos/useCases/buscarUniversoPorId/buscarUniversoPorIdController.ts
var import_zod = require("zod");
async function buscarUniversoPorId(req, res) {
  const reqParamsSchema = import_zod.z.object({
    id: import_zod.z.coerce.number()
  });
  const { id } = reqParamsSchema.parse(req.params);
  const buscarUniversoPorIdUseCase = req.diScope.resolve(
    "buscarUniversoPorIdUSecase"
  );
  const universo = await buscarUniversoPorIdUseCase.execute(id);
  return res.status(200).send(universo);
}

// src/shared/errors/AppErros.ts
var AppErrors = class {
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
};

// src/modules/universos/useCases/criarUniverso/criarUniversoController.ts
var import_zod2 = require("zod");
var CriarUniversoController = class {
  async handle(req, res) {
    const reqBody = import_zod2.z.object({
      lojaSigla: import_zod2.z.string(),
      universo: import_zod2.z.string(),
      zona: import_zod2.z.string().default("0"),
      andar: import_zod2.z.string().default("0")
    });
    const data = reqBody.parse(req.body);
    try {
      const criarUniversoUseCase = req.diScope.resolve("criarUniversoUsecase");
      await criarUniversoUseCase.execute({
        Universo: data.universo,
        Andar: data.andar,
        Loja_Sigla: data.lojaSigla,
        Zona: data.zona
      });
    } catch (error) {
      if (error instanceof AppErrors) {
        return res.status(409).send({ message: error.message });
      }
      throw error;
    }
    return res.status(200).send("Universo crido com sucesso");
  }
};

// src/modules/universos/useCases/deletarUniverso/deletarUniversoController.ts
var import_zod3 = require("zod");
async function deletarUniversoHandle(req, res) {
  const reqParams = import_zod3.z.object({
    id: import_zod3.z.coerce.number()
  });
  const { id } = reqParams.parse(req.params);
  const deletarUniversoUsecase = req.diScope.resolve("deletarUniversoUsecase");
  await deletarUniversoUsecase.execute(id);
  return res.code(200).send("universo excluido com sucesso");
}

// src/modules/universos/useCases/editarUniverso/editarUniversoController.ts
var import_zod4 = require("zod");
var EditarUniversoController = class {
  async handle(req, res) {
    const reqBody = import_zod4.z.object({
      id: import_zod4.z.number(),
      universo: import_zod4.z.string(),
      zona: import_zod4.z.string(),
      andar: import_zod4.z.string()
    });
    const { id, universo, zona, andar } = reqBody.parse(req.body);
    const editarUniversoUseCase = req.diScope.resolve("editarUniversoUsecase");
    await editarUniversoUseCase.execute({
      id,
      Universo: universo,
      Zona: zona,
      Andar: andar
    });
    return res.status(200).send(`Universo alterado com sucesso`);
  }
};

// src/modules/universos/useCases/listarUniversosPorLoja/listarUniversosPorLojaController.ts
var import_zod5 = require("zod");
var ListarUniversosPorLojaController = class {
  async handle(req, res) {
    const reqParams = import_zod5.z.object({
      sigla: import_zod5.z.string()
    });
    const { sigla } = reqParams.parse(req.params);
    const listarUniversosPorLojaUsecase = req.diScope.resolve(
      "listarUniversosPorLojaUsecase"
    );
    const universos = await listarUniversosPorLojaUsecase.execute(sigla);
    return res.status(200).send(universos);
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

// src/shared/infra/http/routes/universos.routes.ts
var listarUniversosPorLojaController = new ListarUniversosPorLojaController();
var criarUniversoController = new CriarUniversoController();
var editarUniversoController = new EditarUniversoController();
async function UniversosRoutes(app) {
  app.post("/", { onRequest: [verificarJwt] }, criarUniversoController.handle);
  app.get("/:sigla", listarUniversosPorLojaController.handle);
  app.put(
    "/editar",
    { onRequest: [verificarJwt] },
    editarUniversoController.handle
  );
  app.delete("/:id", { onRequest: [verificarJwt] }, deletarUniversoHandle);
  app.get("/universo/:id", buscarUniversoPorId);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UniversosRoutes
});
