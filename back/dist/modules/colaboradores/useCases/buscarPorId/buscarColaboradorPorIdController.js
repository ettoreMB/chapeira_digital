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

// src/modules/colaboradores/useCases/buscarPorId/buscarColaboradorPorIdController.ts
var buscarColaboradorPorIdController_exports = {};
__export(buscarColaboradorPorIdController_exports, {
  buscarColaboradorPorId: () => buscarColaboradorPorId
});
module.exports = __toCommonJS(buscarColaboradorPorIdController_exports);
var import_zod = require("zod");
async function buscarColaboradorPorId(req, res) {
  const reqParamsSchema = import_zod.z.object({
    id: import_zod.z.coerce.number()
  });
  const { id } = reqParamsSchema.parse(req.params);
  const buscarColaboradorPorId2 = req.diScope.resolve(
    "buscarColaboradorPorIdUseCase"
  );
  const colaborador = await buscarColaboradorPorId2.execute(id);
  return res.status(200).send(colaborador);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  buscarColaboradorPorId
});
