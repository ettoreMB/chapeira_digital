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

// src/utils/encryptPassword.ts
var encryptPassword_exports = {};
__export(encryptPassword_exports, {
  encrypt: () => encrypt,
  verifyPassword: () => verifyPassword
});
module.exports = __toCommonJS(encryptPassword_exports);
var import_crypto = require("crypto");
function encrypt(password) {
  const hash = (0, import_crypto.createHmac)("sha256", "@Mepm24121968");
  const encryptPassword = hash.update(password).digest("hex");
  return encryptPassword;
}
function verifyPassword(password, hasedPassword) {
  return encrypt(password) === hasedPassword;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  encrypt,
  verifyPassword
});
