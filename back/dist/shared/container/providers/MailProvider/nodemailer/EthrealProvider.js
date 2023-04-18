"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/shared/container/providers/MailProvider/nodemailer/EthrealProvider.ts
var EthrealProvider_exports = {};
__export(EthrealProvider_exports, {
  EthrealMailProvider: () => EthrealMailProvider
});
module.exports = __toCommonJS(EthrealProvider_exports);
var import_node_fs = __toESM(require("fs"));
var nodemailer = __toESM(require("nodemailer"));
var import_handlebars = __toESM(require("handlebars"));
var EthrealMailProvider = class {
  constructor() {
  }
  async enviarEmail(to, subject, variables, path) {
    await nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      });
      this.client = transporter;
    }).catch((err) => console.log(err));
    const templateFileContent = import_node_fs.default.readFileSync(path).toString("utf-8");
    const templateParse = import_handlebars.default.compile(templateFileContent);
    const templateHtml = templateParse(variables);
    const email = await this.client.sendMail({
      from: "Suporte@chapeira.com",
      to,
      subject,
      html: templateHtml
    });
    console.log("Message sent: %s", email);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(email));
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EthrealMailProvider
});
