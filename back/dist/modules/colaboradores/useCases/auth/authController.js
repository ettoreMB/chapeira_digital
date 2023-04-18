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

// src/modules/colaboradores/useCases/auth/authController.ts
var authController_exports = {};
__export(authController_exports, {
  authenticate: () => authenticate
});
module.exports = __toCommonJS(authController_exports);
var import_zod = require("zod");
async function authenticate(req, res) {
  const authenticateBodySchema = import_zod.z.object({
    email: import_zod.z.string().email(),
    senha: import_zod.z.string()
  });
  const { email, senha } = authenticateBodySchema.parse(req.body);
  const adminUsecase = req.diScope.resolve("authUsecase");
  const admin = await adminUsecase.execute(email, senha);
  const token = await res.jwtSign({}, { sign: { sub: admin.Email } });
  return res.setCookie("token", token).status(200).send({ token, nome: admin.Nome });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  authenticate
});
