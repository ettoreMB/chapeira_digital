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

// src/modules/lojas/useCases/dashBoard/dashBoardController.ts
var dashBoardController_exports = {};
__export(dashBoardController_exports, {
  dashBoardController: () => dashBoardController
});
module.exports = __toCommonJS(dashBoardController_exports);
var import_zod = require("zod");
async function dashBoardController(req, res) {
  const ReqParamsSchema = import_zod.z.object({
    nome: import_zod.z.string()
  });
  const { nome } = ReqParamsSchema.parse(req.params);
  const dashBoardUsecase = req.diScope.resolve("dashBoardUsecase");
  const { dados } = await dashBoardUsecase.execute(nome);
  return res.status(200).send(dados);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  dashBoardController
});
