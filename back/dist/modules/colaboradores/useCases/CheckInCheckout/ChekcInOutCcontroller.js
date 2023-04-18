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

// src/modules/colaboradores/useCases/CheckInCheckout/ChekcInOutCcontroller.ts
var ChekcInOutCcontroller_exports = {};
__export(ChekcInOutCcontroller_exports, {
  ChekcInOutController: () => ChekcInOutController
});
module.exports = __toCommonJS(ChekcInOutCcontroller_exports);
var import_zod = require("zod");
var ChekcInOutController = class {
  async handle(req, res) {
    const reqParam = import_zod.z.object({
      id: import_zod.z.coerce.number()
    });
    const { id } = reqParam.parse(req.params);
    const ip = req.socket.remoteAddress;
    const browser = req.headers["user-agent"];
    const checkInOutUseCase = req.diScope.resolve("checkInCheckOutUsecase");
    const resposta = await checkInOutUseCase.execute(
      id,
      String(ip),
      String(browser)
    );
    return res.status(200).send(resposta);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ChekcInOutController
});
