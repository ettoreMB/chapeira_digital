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

// src/modules/contatosDeEmergencia/useCases/deletarContato/deletarContatoController.ts
var deletarContatoController_exports = {};
__export(deletarContatoController_exports, {
  deletarContato: () => deletarContato
});
module.exports = __toCommonJS(deletarContatoController_exports);
var import_zod = require("zod");
async function deletarContato(req, res) {
  const reqParams = import_zod.z.object({
    id: import_zod.z.coerce.number()
  });
  const { id } = reqParams.parse(req.params);
  const deletarContatoUseCase = req.diScope.resolve(
    "deletarContatoDeEmergencia"
  );
  await deletarContatoUseCase.execute(id);
  return res.status(200).send("Contato deletado com sucesso");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  deletarContato
});
