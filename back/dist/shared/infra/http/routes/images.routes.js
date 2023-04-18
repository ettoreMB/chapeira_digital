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

// src/shared/infra/http/routes/images.routes.ts
var images_routes_exports = {};
__export(images_routes_exports, {
  imagensRoutes: () => imagensRoutes
});
module.exports = __toCommonJS(images_routes_exports);

// src/modules/imagens/useCases/buscarImagens/buscarImagensController.ts
var import_zod = require("zod");
var BuscarImagensController = class {
  async handle(req, res) {
    const reqParams = import_zod.z.object({
      loja: import_zod.z.string()
    });
    const { loja } = reqParams.parse(req.params);
    const buscarImagensUseCase = req.diScope.resolve("buscarImagensUseCase");
    const imagens = await buscarImagensUseCase.execute(loja);
    return res.status(200).send(imagens);
  }
};

// src/shared/infra/http/routes/images.routes.ts
var buscarImagensController = new BuscarImagensController();
async function imagensRoutes(app) {
  app.get("/:loja", buscarImagensController.handle);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  imagensRoutes
});
