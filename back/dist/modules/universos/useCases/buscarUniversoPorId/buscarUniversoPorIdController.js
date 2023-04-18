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

// src/modules/universos/useCases/buscarUniversoPorId/buscarUniversoPorIdController.ts
var buscarUniversoPorIdController_exports = {};
__export(buscarUniversoPorIdController_exports, {
  buscarUniversoPorId: () => buscarUniversoPorId
});
module.exports = __toCommonJS(buscarUniversoPorIdController_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  buscarUniversoPorId
});
